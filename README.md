# Future Net Explorer

Future Net Explorer is an open-source React application for exploring aquaculture net technologies from raw polymer materials to deployed net products. It uses an interactive Sankey diagram to show how materials, fibers, yarns, twines, net constructions, treatments, performance properties, and applications connect.

## Features

- Interactive D3 Sankey diagram powered by a generic graph structure.
- Hover a node to highlight upstream and downstream paths while fading unrelated routes.
- Select a node to inspect metadata, imagery, references, and related technologies.
- Global search that highlights matching technologies and related routes.
- Filters for material, net type, performance property, and application.
- Responsive layout with light and dark modes.
- Business data loaded from JSON.
- Strict TypeScript, unit tests, component tests, and GitHub Actions CI.

## Tech Stack

- React
- TypeScript
- Vite
- D3.js
- d3-sankey
- Tailwind CSS
- Vitest and Testing Library

## Getting Started

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Build and verify:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## GitHub Pages

This repository includes a GitHub Pages workflow in `.github/workflows/pages.yml`. After pushing to `main`, enable Pages in the repository settings with **GitHub Actions** as the source. The Vite base path is derived from `GITHUB_REPOSITORY`, so project pages such as `owner/future-net-explorer` deploy under `/future-net-explorer/`, while `owner.github.io` repositories deploy at `/`.

## Data

The example aquaculture dataset lives in [src/data/aquaculture-networks.json](src/data/aquaculture-networks.json). Nodes use this shape:

```json
{
  "id": "pe",
  "label": "PE",
  "type": "material",
  "description": "...",
  "image": "...",
  "references": []
}
```

Links use this shape:

```json
{
  "source": "pe",
  "target": "monofilament",
  "value": 10
}
```

## Project Structure

```text
src/
  components/       React components and SVG diagram surface
  data/             JSON business data
  domain/           Graph, search, filtering, and technology types
  hooks/            UI state orchestration
  infrastructure/   Data loading adapters
  visualization/    Generic d3-sankey layout adapter
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the architecture rationale.

## License

MIT. See [LICENSE](LICENSE).
