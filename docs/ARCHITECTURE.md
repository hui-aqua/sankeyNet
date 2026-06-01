# Architecture

Future Net Explorer separates aquaculture domain knowledge from visualization code. The application can therefore reuse the same JSON-backed graph for future visualizations such as matrices, force graphs, route comparison tables, or lifecycle views.

## Layers

### Data

Business data is stored in `src/data/aquaculture-networks.json`. The JSON contains technology nodes and weighted links only. It does not contain Sankey layout details, SVG coordinates, colors, or UI state.

### Domain

The domain layer in `src/domain` owns the application rules:

- `types.ts` defines technology nodes, links, categories, filters, and generic graph structures.
- `graph.ts` validates datasets, creates reusable graphs, and computes upstream and downstream connected paths.
- `search.ts` performs metadata search.
- `filters.ts` derives filter options and route matches.

This layer has no React or D3 dependency.

### Infrastructure

`src/infrastructure/loadTechnologyGraph.ts` imports the JSON dataset and converts it into the validated domain graph. If the app later loads data from an API, CSV import, or CMS, this layer is the expected replacement point.

### Visualization

`src/visualization/sankeyLayout.ts` is a generic D3 adapter. It receives a `Graph<TNode, TLink>` and returns positioned nodes and links. It does not know about aquaculture categories, filters, selected nodes, or metadata panels.

`src/components/SankeyDiagram.tsx` renders SVG from that generic layout. It receives label and category accessors from the app layer, so the component can render other graph domains without changing its layout contract.

### Application State

`src/hooks/useGraphExplorer.ts` coordinates hover, selection, search, and filters by composing domain functions. Components receive ready-to-render state and callbacks.

## Interaction Flow

1. JSON data is loaded through the infrastructure adapter.
2. Domain validation creates a generic graph.
3. `useGraphExplorer` derives selected node metadata, connected paths, search matches, and filter matches.
4. `SankeyDiagram` receives generic graph data plus active node and link IDs.
5. `NodeDetailsPanel`, `SearchBox`, and `FilterPanel` render domain-specific controls without embedding graph traversal logic.

## Extending the Dataset

Add nodes and links to `src/data/aquaculture-networks.json`. The graph builder will fail fast when:

- A node ID is duplicated.
- A link source does not exist.
- A link target does not exist.

For richer metadata, extend `TechnologyNode` in `src/domain/types.ts`, then update the details panel or search index as needed.

## Adding Future Visualizations

Future visualizations should consume `Graph<TNode, TLink>` directly or use domain selectors from `src/domain`. They should not import aquaculture JSON directly, and they should avoid duplicating route traversal, filtering, or search logic in components.
