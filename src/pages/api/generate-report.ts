import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const POST: APIRoute = async ({ request }) => {
  const { name, businessName, role, answers, businessType, statedDifferentiator } = await request.json();

  // Compute zone scores
  const scores: Record<string, number> = { blue: 0, green: 0, yellow: 0, red: 0 };
  const zoneMap = ['blue', 'green', 'yellow', 'red', 'blue', 'red', 'yellow', 'green'];
  answers.forEach((a: { index: number; score: number }) => {
    scores[zoneMap[a.index]] += a.score;
  });
  const totalScore = answers.reduce((s: number, a: { score: number }) => s + a.score, 0);

  // Build answer list for prompt
  const answerList = answers
    .map((a: { label: string; text: string }) => `- ${a.label}: "${a.text}"`)
    .join('\n');

  const systemPrompt = `You are a brand strategist at Whole Brand Academy. You write like a smart, straight-talking friend — not a consultant. Short sentences. Plain words. No jargon. No filler. Every line should either make them think "that's exactly it" or "ouch, that's true." Be honest about gaps — name what they're costing, not just what they are. Two sentences max per insight zone.`;

  const differentiatorLine = (businessType || statedDifferentiator)
    ? `Their self-stated positioning: "We are the only ${businessType || '[type not given]'} that ${statedDifferentiator || '[left blank]'}"`
    : `They left the positioning sentence blank — treat this as a significant signal of unclear positioning.`;

  const userPrompt = `Brand Scan for ${businessName} (${role}: ${name}).

${differentiatorLine}

Scores (each out of 6):
- Blue (Credibility + Rational Case): ${scores.blue}/6
- Green (Delivery + Coherence): ${scores.green}/6
- Yellow (Differentiation + Purpose): ${scores.yellow}/6
- Red (Personality + Emotional Connection): ${scores.red}/6
- Total: ${totalScore}/24

Their answers:
${answerList}

Return ONLY a valid JSON object with exactly these fields:
{
  "blueInsight": "2 sentences. Credibility and rational case — name what's there and what's missing. If weak, say what it costs them in plain terms.",
  "greenInsight": "2 sentences. Delivery consistency and brand coherence — where they're solid or where inconsistency is silently killing trust.",
  "yellowInsight": "2 sentences. Differentiation and purpose — compare their stated differentiator (if any) against what the scan reveals. If they couldn't complete the sentence, say so directly.",
  "redInsight": "2 sentences. Personality and emotional connection — are clients feeling something deliberate, or just 'meh, professional enough'?",
  "brandPromise": "3-6 words. Tension-filled shorthand for what this brand could stand for — synthesise their rational strengths and emotional gaps. If their stated differentiator is strong, anchor it there. If weak or absent, make it aspirational. NOT a tagline. Don't use the business name.",
  "howText": "One sentence. How do they do what they do — their approach or method, drawn from their process/coherence answers.",
  "overallInsight": "3 sentences max. The single most important thing this brand needs to fix. Use their own stated differentiator (or lack of one) as the hook. Make the cost of inaction concrete and real.",
  "tier": "strong OR mixed OR unbuilt OR invisible"
}

Tier: strong=20-24, mixed=13-19, unbuilt=7-12, invisible=6 or below.`;

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extract text content
    const textBlock = message.content.find((b: { type: string }) => b.type === 'text');
    const rawText = textBlock && 'text' in textBlock ? textBlock.text : '';

    // Parse JSON from response (handle possible markdown wrapping)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: 'Failed to parse AI response', raw: rawText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const report = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({
      ...report,
      scores,
      totalScore,
      businessName,
      name,
      role,
      businessType: businessType || null,
      statedDifferentiator: statedDifferentiator || null,
      answers,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: 'Anthropic API call failed', detail: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
