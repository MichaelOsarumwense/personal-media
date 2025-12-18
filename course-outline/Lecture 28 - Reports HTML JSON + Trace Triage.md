# Lecture 28 – Reports (HTML/JSON) + Trace Triage

Estimated runtime: 8–10 minutes

Objective
- Consume Playwright’s HTML/JSON reports and use trace to triage failures quickly.

Prerequisites
- Lectures 01–27.

Key Concepts
- HTML report for interactive analysis; JSON for CI summaries/dashboards.
- Trace links help pivot from summary → detailed step view.

Files
- playwright.config.ts:1 (reporters configured)
- reports/ui-e2e/report.json (output after a run)

Config (excerpt)
```ts
reporter: [
  ['line'],
  ['html', { outputFolder: 'reports/ui-e2e/html', open: 'never' }],
  ['json', { outputFile: 'reports/ui-e2e/report.json' }],
],
```

Open HTML Report
- After a run: `npx playwright show-report reports/ui-e2e/html`

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

