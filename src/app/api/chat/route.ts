import { NextRequest, NextResponse } from 'next/server';
import { getAiChatResponse } from '@/lib/aiPlanner';
import { sanitizeString, checkRateLimit, INPUT_LIMITS } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local-client';
    const rateCheck = checkRateLimit(ip, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a few seconds before sending another message.' },
        { status: 429 }
      );
    }

    const { message, eventPlan, history } = await req.json();

    const sanitizedMessage = sanitizeString(message, INPUT_LIMITS.CHAT_MESSAGE);
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const aiResult = await getAiChatResponse(sanitizedMessage, eventPlan, history || []);

    return NextResponse.json({
      success: true,
      reply: aiResult.reply,
      suggestions: aiResult.suggestions
    });
  } catch (err: unknown) {
    console.error('API /api/chat error:', err);
    return NextResponse.json({ error: 'Failed to process chat consultation' }, { status: 500 });
  }
}
