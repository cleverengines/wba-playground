import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const POST: APIRoute = async ({ request }) => {
  const { websiteUrl, report } = await request.json();

  if (!websiteUrl || !report) {
    return new Response(JSON.stringify({ error: 'Missing websiteUrl or report data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Fetch the homepage
  let homepageText = '';
  try {
    const res = await fetch(websiteUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WBAScanner/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();

    // Strip HTML tags and collapse whitespace
    homepageText = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000); // Cap at 4000 chars — enough to assess a homepage

  } catch {
    return new Response(JSON.stringify({
      error: 'fetch_failed',
      message: "We couldn't reach that URL — the site may be blocking automated requests. Try pasting your homepage copy below instead.",
    }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (homepageText.length < 100) {
    return new Response(JSON.stringify({
      error: 'insufficient_content',
      message: "We couldn't extract enough content from that page. Try pasting your homepage copy directly.",
    }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build the differentiator line from report data
  const differentiatorLine = (report.businessType || report.statedDifferentiator)
    ? `They claim: "We are the only ${report.businessType || ''} that ${report.statedDifferentiator || ''}".`
    : 'They could not articulate their differentiator.';

  const systemPrompt = `You are a brand strategist reviewing a business's homepage against their brand scan results. You write in plain, direct language — short sentences, no jargon. You name what you see, not what you think they want to hear.`;

  const userPrompt = `${report.businessName} just completed a Whole Brand Scan. Here's what they told us:

${differentiatorLine}
Scores: Blue (Credibility) ${report.scores.blue}/6 | Green (Delivery) ${report.scores.green}/6 | Yellow (Differentiation) ${report.scores.yellow}/6 | Red (Personality) ${report.scores.red}/6
Brand tier: ${report.tier} (${report.totalScore}/24)

Here is their actual homepage content:
---
${homepageText}
---

Assess how well their homepage reflects their brand scan results. Return ONLY a valid JSON object:
{
  "congruencyScore": number between 0-100,
  "headline": "One sentence — the single most important finding. Blunt.",
  "blueCongruency": "1-2 sentences. Does the homepage prove credibility? Or does it just claim it?",
  "greenCongruency": "1-2 sentences. Does the homepage reflect a clear, consistent process? Or is it vague on how they work?",
  "yellowCongruency": "1-2 sentences. Does the homepage say something genuinely different? Or does it sound like everyone else in the category?",
  "redCongruency": "1-2 sentences. Does the personality of the homepage match what they said about their brand? Or is it generic corporate voice?",
  "biggestGap": "2-3 sentences. The single most damaging mismatch between what they said in the scan and what their homepage actually shows the world. Make it concrete.",
  "quickWin": "1-2 sentences. The one change to the homepage that would make the biggest immediate difference."
}`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textBlock = message.content.find((b: { type: string }) => b.type === 'text');
    const rawText = textBlock && 'text' in textBlock ? (textBlock as { type: string; text: string }).text : '';
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = { ...JSON.parse(jsonMatch[0]), websiteUrl };

    // Log websiteUrl + congruency score back to Sheets if webhook is set
    const sheetsUrl = import.meta.env.SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteScanUpdate: true,
          businessName: report.businessName,
          email: report.email,
          websiteUrl,
          congruencyScore: result.congruencyScore,
          biggestGap: result.biggestGap,
        }),
      }).catch(() => {});
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: 'AI call failed', detail: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
