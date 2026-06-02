# SankeyNet

SankeyNet is a minimal Vite + React application that renders an interactive Plotly Sankey diagram in the browser.

## What it includes

- A simple single-page React app
- A Plotly Sankey chart in `src/components/SankeyDiagram.tsx`
- Manual node position control via `nodePos`
- A clean, minimal UI with only the Sankey visualization

## Run locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Build

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

- `src/App.tsx` — app entry point
- `src/main.tsx` — Vite React bootstrap
- `src/components/SankeyDiagram.tsx` — Plotly Sankey implementation
- `src/index.css` — app styles

## Notes

- The Sankey component loads Plotly from a CDN, so no local Plotly package is required in the app bundle.
- This repository no longer includes the old JSON dataset, D3 graph adapters, or legacy test artifacts.

## License

MIT. See `LICENSE`.
