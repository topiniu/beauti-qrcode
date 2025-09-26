# Repository Guidelines

## Project Structure & Module Organization
The app follows standard Create React App layout. Source components live in `src/` with `App.js` orchestrating state and `QRCodeComponent.js` handling QR generation and animation. Styling resides in `App.css` and `index.css`, while testing helpers (`setupTests.js`, `App.test.js`) sit alongside the code they cover. Static assets and the HTML shell are under `public/`. Use subdirectories in `src/` (e.g., `src/components/`, `src/hooks/`) as the codebase grows to keep features modular.

## Build, Test, and Development Commands
Run `npm install` once to pull dependencies. Use `npm start` for the local dev server with hot reloading. Ship-ready bundles come from `npm run build`, which outputs to `build/`. Run `npm run build:lib` to bundle the distributable library into `dist/` before publishing. Execute `npm test` to launch Jest + React Testing Library in watch mode; append `-- --coverage` when you need a coverage report for PRs or releases.

## Coding Style & Naming Conventions
Stick to functional React components, hooks, and the default CRA ESLint rules that surface during `npm start`/`npm test`. Prefer 2-space indentation, trailing semicolons, and single quotes for strings unless JSX requires double quotes. Use PascalCase for component files (`QRCodeComponent.js`) and camelCase for local utilities and hooks. Place component-specific styles next to the component until reuse justifies extracting shared styles.

## Testing Guidelines
Keep tests colocated with the files they verify using the `*.test.js` suffix. Favor React Testing Library patterns: render the component, interact via roles or labels, and assert visible outcomes. Cover new behaviors, edge cases (e.g., empty URL input), and animation toggles when feasible. Run `npm test -- --watch=false` before pushing to ensure deterministic results, and include coverage output when introducing major features.

## Commit & Pull Request Guidelines
Use short, imperative commit subjects (e.g., `Add animated QR render`), optionally prefixed with a scope when helpful. Group related changes into a single commit to keep history readable. Pull requests should describe the change, link any tracking issues, list testing done, and attach screenshots or clips for UI tweaks. Ensure CI (or local test runs) is green before requesting review.

## Security & Configuration Tips
Never hardcode sensitive URLs or tokens. Instead, rely on `.env.local` and reference values through `process.env`. Audit third-party QR or animation libraries before upgrades, and confirm the dev server only listens on localhost when testing experimental features.
