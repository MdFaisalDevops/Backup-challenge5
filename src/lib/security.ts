/**
 * Security & Input Sanitization Utilities
 * Ensures safe and responsible GenAI prompt handling, injection mitigation, and XSS defense.
 */

// Maximum input character lengths to prevent memory/token exhaustion attacks
export const INPUT_LIMITS = {
  TITLE: 100,
  LOCATION: 120,
  THEME: 120,
  PRIORITY: 120,
  SPECIAL_NOTES: 500,
  CHAT_MESSAGE: 800,
};

// Patterns commonly associated with prompt injection or evasion
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+a/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript:/i,
  /onload\s*=/i,
  /onerror\s*=/i,
];

/**
 * Sanitizes user input string: trims, removes control characters, strips potential script injections.
 */
export function sanitizeString(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  
  // Strip null bytes and control chars
  let cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Basic HTML entity encoding for dangerous characters
  cleaned = cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  return cleaned.trim().slice(0, maxLength);
}

/**
 * Checks if the text contains high-risk prompt injection patterns
 */
export function hasPromptInjection(text: string): boolean {
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Safely extracts JSON from an LLM response string that might be wrapped in ```json ... ``` codeblocks
 */
export function safeExtractJson<T>(rawText: string, fallback: T): T {
  try {
    let clean = rawText.trim();
    
    // Remove markdown code fences if present
    if (clean.startsWith('```')) {
      clean = clean.replace(/^```(?:json)?\s*/i, '');
      clean = clean.replace(/```\s*$/, '');
      clean = clean.trim();
    }
    
    // Find the first '{' and last '}'
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    
    return JSON.parse(clean) as T;
  } catch (err) {
    console.warn('Failed to parse JSON from AI response, using safe fallback:', err);
    return fallback;
  }
}

/**
 * In-memory sliding window rate limiter for API routes
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(clientId: string, maxRequests = 30, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (clientData.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count += 1;
  return { allowed: true, remaining: maxRequests - clientData.count };
}
