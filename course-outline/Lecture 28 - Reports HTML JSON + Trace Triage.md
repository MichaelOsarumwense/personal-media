# Lecture 28 – Reports (HTML/JSON) + Trace Triage

Estimated runtime: 8–10 minutes

Objective
- Configure reporters from scratch and practice quick trace triage.

Prerequisites
- Lectures 01–27.

Key Concepts
- HTML report for interactive analysis; JSON for CI summaries/dashboards.
- Trace links help pivot from summary → detailed step view.

Start State
- Basic Playwright config exists; add/reporters and triage workflow.

Outcome
- HTML + JSON reports configured, with a simple summary script and a repeatable trace triage process.

Files
- playwright.config.ts (reporters configured)
- reports/ui-e2e/report.json (output after a run)

Config (excerpt)
```ts
reporter: [
  ['line'],
  ['html', { outputFolder: 'reports/ui-e2e/html', open: 'never' }],
  ['json', { outputFile: 'reports/ui-e2e/report.json' }],
],
```

Steps
1) Configure reporters
   - In `playwright.config.ts` add `html` and `json` reporters (see snippet above).
2) Run any spec to produce reports
3) Open HTML report
   - `npx playwright show-report reports/ui-e2e/html`

Tip
- When triaging trace for SPA navigations, prefer seeing `expect(page).toHaveURL(...)` and element assertions over `waitForURL(..., { waitUntil: 'load' })`, which can hang on client-side routes.

Quick JSON Summary Script (example)
```ts
// scripts/summarize-report.ts (example snippet)
import fs from 'fs';
type Result = { status: string; title: string; projectName?: string };
const data = JSON.parse(fs.readFileSync('reports/ui-e2e/report.json', 'utf8'));
const results: Result[] = data?.suites?.flatMap((s: any) => s.suites ?? []).flatMap((s: any) => s.specs ?? [])
  .flatMap((sp: any) => sp.tests ?? []).map((t: any) => ({ status: t.results?.[0]?.status, title: t.title, projectName: t.projectName }));
const byStatus = results.reduce((acc: any, r) => ((acc[r.status] = (acc[r.status]||0)+1), acc), {});
console.log('Summary:', byStatus); console.log('Failures:', results.filter(r => r.status!=='passed').map(r=>r.title));
```

Trace Triage
- Open failing test’s trace (HTML report links to trace when retained).
- Inspect: steps → attachments → console/network tabs.

Validation
- CI artifacts include HTML + JSON reports; summary script prints concise counts.

Deliverables
- A reporting workflow that surfaces high-signal summaries and links to deep traces.
