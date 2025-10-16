# Selenium UI Tests (Personal Media)

End-to-end Selenium WebDriver + Mocha tests for the Personal Media React app.

## Setup

1. Copy `.env.example` to `.env` and fill `BASE_URL` and credentials.
2. Install deps:
   cd selenium && npm install
3. Start the React app separately (e.g., `npm start` at the repo root) so it serves at `BASE_URL`.

## Run

- All tests: `npm test`
- Smoke only: `npm run test:smoke`
- Headed: `npm run test:headed`
- Merge HTML report: `npm run report`

## Notes
- Destructive tests (profile update, registration, password reset) are opt-in via env flags.
- Post mutations default to enabled; disable with `ALLOW_POST_MUTATIONS=false` if needed.

