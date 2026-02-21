# WBA Playground

Internal prototype environment for Whole Brand Academy tools.

Currently contains two projects:
1. **Kajabi Course Prototype** — mockup of the WBA course module layout (`/` and `/lessons/[slug]`)
2. **Whole Brand Scan** — interactive brand diagnostic tool (`/scan`)

---

## Whole Brand Scan

A short survey tool that maps a founder's brand across the four HBDI thinking zones (Whole Brain Model), generates AI-powered insights per zone, and surfaces the single biggest strategic gap. Optional step 2: scan their homepage for congruency with their scan answers.

**Status:** Internal prototype — password protected, not public.

### What it does

1. User enters their name, email, business name, role, and completes "We are the only [type] that [differentiator]"
2. 8-question survey, one question at a time, colour-coded by HBDI zone
3. Answers submitted to the API — Claude generates per-zone insights, a Brand Promise, and an overall gap analysis
4. Results displayed on a visual grid (4 quadrants + WHY/HOW/WHAT strip)
5. Optional: enter website URL for a homepage congruency check (second AI call)
6. All data logged to Google Sheets automatically

### What it is NOT

- It is **not** a Brand-on-a-Page. It uses the BOAP architecture as a display format but does not produce a BOAP.
- It is **not** publicly accessible — internal testing and iteration only at this stage.

---

## Tech Stack

- **Framework:** Astro 5 (SSR mode)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (cleverengines team)
- **AI:** Anthropic Claude (`claude-haiku-4-5`) via `@anthropic-ai/sdk`
- **Data logging:** Google Sheets via Apps Script webhook

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Kajabi course prototype landing |
| `/lessons/[slug]` | Course module pages |
| `/scan/login` | Password gate for the scan tool |
| `/scan` | Intake form (name, email, business, role, differentiator) |
| `/scan/quiz` | 8-question survey |
| `/scan/results` | AI-generated brand scan report + optional website scanner |
| `/api/scan-auth` | POST — validates password, sets auth cookie |
| `/api/generate-report` | POST — runs AI analysis, logs to Sheets, returns report JSON |
| `/api/scan-website` | POST — fetches homepage, runs congruency analysis against scan data |

---

## Environment Variables

Set these in Vercel dashboard (Settings → Environment Variables). **Never commit to git.**

| Variable | Description | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude calls | 1Password: `API - Anthropic - Clawdia-brand-scan-wba` |
| `SCAN_PASSWORD` | Password for the `/scan/login` gate | Currently: `WBAinternal2026` |
| `SHEETS_WEBHOOK_URL` | Google Apps Script web app URL for Sheets logging | See Google Sheets section below |

---

## Google Sheets Logging

Every completed scan POSTs to a Google Apps Script web app and appends a row with 24 columns:

`Timestamp | Name | Email | Business | Role | Business Type | Stated Differentiator | Total Score | Tier | Blue | Green | Yellow | Red | Brand Promise | How Text | Overall Insight | Q1–Q8 answers`

**Apps Script (paste in Sheet → Extensions → Apps Script):**

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Business', 'Role',
      'Business Type', 'Stated Differentiator',
      'Total Score', 'Tier',
      'Blue Score', 'Green Score', 'Yellow Score', 'Red Score',
      'Brand Promise', 'How Text', 'Overall Insight',
      'Q1: Credibility', 'Q2: Delivery', 'Q3: Differentiation',
      'Q4: Personality', 'Q5: Rational Case', 'Q6: Emotional Connection',
      'Q7: Purpose', 'Q8: Coherence'
    ]);
  }

  const answers = data.answers || [];
  const answerTexts = Array(8).fill('');
  answers.forEach(a => { answerTexts[a.index] = a.text; });

  sheet.appendRow([
    new Date().toISOString(),
    data.name, data.email || '', data.businessName, data.role,
    data.businessType || '', data.statedDifferentiator || '',
    data.totalScore, data.tier,
    data.scores?.blue, data.scores?.green,
    data.scores?.yellow, data.scores?.red,
    data.brandPromise, data.howText || '', data.overallInsight,
    ...answerTexts
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy as: **Execute as: Me**, **Who has access: Anyone**.

---

## AI Prompt Design

### Brand Scan (`/api/generate-report`)

Model: `claude-haiku-4-5`

The prompt passes:
- Business name, name, role
- Their stated positioning: `"We are the only [businessType] that [statedDifferentiator]"`
- Zone scores (Blue/Green/Yellow/Red, each out of 6 combining two questions)
- All 8 individual answers (verbatim option text)

Returns JSON with: `blueInsight`, `greenInsight`, `yellowInsight`, `redInsight`, `brandPromise`, `howText`, `overallInsight`, `tier`

**Tone instruction:** Plain language, two sentences max per zone, no consultant-speak. Every sentence should make them think "that's exactly it" or "ouch, that's true."

**Brand Promise rule:** Anchored to their stated differentiator if provided. If not, drawn from zone strengths. NOT a tagline. 3–6 words. Tension between rational and emotional (e.g. "Advanced Simplicity", "Modern Romance").

### Homepage Congruency (`/api/scan-website`)

Model: `claude-haiku-4-5`

Fetches the provided URL (8s timeout), strips HTML to clean text (capped at 4,000 chars), then assesses against the brand scan results.

Returns: `congruencyScore` (0–100), `headline`, per-zone congruency notes, `biggestGap`, `quickWin`

Gracefully handles blocked sites (returns `fetch_failed` error with user-friendly message).

---

## HBDI Zone Colours

| Zone | Quadrant | HBDI | Tailwind class | Hex |
|---|---|---|---|---|
| Source of Authority / Credibility | Top-left (A) | Blue | `hbdi-blue` | `#5B9BD5` |
| Product & Process / Delivery | Bottom-left (B) | Green | `hbdi-green` | `#70AD47` |
| Points of Difference / Differentiation | Top-right (D) | Yellow | `hbdi-yellow` | `#FFC000` |
| Style & Personality / Emotion | Bottom-right (C) | Red | `hbdi-red` | `#E07060` |

---

## Scoring

Each question scores 1–3. Two questions per zone → each zone is scored out of 6. Total out of 24.

| Tier | Score | Label |
|---|---|---|
| Strong | 20–24 | Strong Brand Foundation |
| Mixed | 13–19 | Mixed Signals |
| Unbuilt | 7–12 | Unbuilt Brand |
| Invisible | ≤6 | Brand Invisible |

---

## Question Map

| Q# | Zone | HBDI | Label |
|---|---|---|---|
| Q1 | Blue | A | Credibility & Proof |
| Q2 | Green | B | Delivery & Consistency |
| Q3 | Yellow | D | Differentiation & Future |
| Q4 | Red | C | Personality & Voice |
| Q5 | Blue | A | The Rational Case |
| Q6 | Red | C | The Emotional Connection |
| Q7 | Yellow | D | Purpose & Why |
| Q8 | Green | B | Brand Coherence |

---

## Password Gate

Middleware at `src/middleware.ts` protects all `/scan/*` routes except `/scan/login` and `/api/scan-auth`.

On login: POST to `/api/scan-auth` → sets `wba_scan_auth` cookie (httpOnly, 24h) → redirects to `/scan`.

To change password: update `SCAN_PASSWORD` env var in Vercel and redeploy.

---

## Deployment

Auto-deploys to Vercel on push to `main`.

**Important:** Never commit `dist/`, `.vercel/`, or `.astro/` — Vite inlines env vars into build output. These are in `.gitignore`.

Vercel project: `wba-playground` (cleverengines team)  
Production URL: `https://wba-playground.vercel.app`

---

## Next Steps

- [ ] Wire email sequence (GHL not set up for WBA yet — parked)
- [ ] Connect domains: `wholebrandacademy.com` or `WholeBrand.academy`
- [ ] Iterate on question copy and AI output quality based on testing
- [ ] Add Nick's review of question framework before any public launch
- [ ] Consider CTA switch from "Founding Member" to live offer when ready
