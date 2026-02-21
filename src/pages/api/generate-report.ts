import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const POST: APIRoute = async ({ request }) => {
  const { name, businessName, role, answers } = await request.json();

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

  const systemPrompt = `You are a senior brand strategist at Whole Brand Academy, experts in the Whole Brain Branding methodology (HBDI-based). You write with authority and directness — no jargon, no fluff, no corporate speak. You name gaps honestly but constructively. Your insights should feel like they came from a smart consultant who spent an hour with this business, not a generic quiz.`;

  const userPrompt = `Brand Scan results for ${businessName} (${role}: ${name}).

Scores (each out of 6, combining two related questions):
- Blue (Credibility + Rational Case): ${scores.blue}/6
- Green (Delivery/Process + Brand Coherence): ${scores.green}/6
- Yellow (Differentiation + Purpose/Why): ${scores.yellow}/6
- Red (Personality/Voice + Emotional Connection): ${scores.red}/6
- Total: ${totalScore}/24

Their answers:
${answerList}

Return ONLY a valid JSON object with these exact fields:
{
  "blueInsight": "2-3 sentences on their credibility and rational case. Specific to their score. If score is 2/6 or below, name what that's costing them.",
  "greenInsight": "2-3 sentences on delivery consistency and brand coherence.",
  "yellowInsight": "2-3 sentences on differentiation and purpose. If weak, explain why vague differentiation means competing on price.",
  "redInsight": "2-3 sentences on brand personality and emotional connection.",
  "brandPromise": "3-6 words. The potential DNA of this brand. Tension between rational and emotional. Like 'Modern Romance' or 'Advanced Simplicity'. NOT a tagline. Do not use their business name.",
  "overallInsight": "3-4 sentences. The single most important thing this brand needs to address. Honest, specific, gap-stretching. Make them feel the cost of not fixing it.",
  "tier": "strong OR mixed OR unbuilt OR invisible"
}

Tier: strong=20-24, mixed=13-19, unbuilt=7-12, invisible=6 or below.`;

  const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: 'claude-3-5-haiku-20241022',
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
    return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const report = JSON.parse(jsonMatch[0]);

  // Add scores to report
  const result = {
    ...report,
    scores,
    totalScore,
    businessName,
    name,
    role,
    answers,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
