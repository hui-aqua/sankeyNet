import { useMemo, useState } from "react";
import { Activity, Waves } from "lucide-react";
import { FilterPanel } from "./components/FilterPanel";
import { NodeDetailsPanel } from "./components/NodeDetailsPanel";
import { SearchBox } from "./components/SearchBox";
import { SankeyDiagram } from "./components/SankeyDiagram";
import { ThemeToggle } from "./components/ThemeToggle";
import { createFilterOptions, emptyFilters } from "./domain/filters";
import { loadTechnologyGraph } from "./infrastructure/loadTechnologyGraph";
import { useGraphExplorer } from "./hooks/useGraphExplorer";

const graph = loadTechnologyGraph();

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const filterOptions = useMemo(() => createFilterOptions(graph), []);
  const explorer = useGraphExplorer(graph, emptyFilters);

  return (
    <div className={isDark ? "dark" : ""}>
      <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ocean-700 dark:text-ocean-100">
                  <Waves className="h-4 w-4" aria-hidden="true" />
                  Aquaculture technology map
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Future Net Explorer</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Explore how polymer choices, yarn routes, twine construction, net design, and treatments connect to
                  aquaculture performance and applications.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:flex sm:items-center sm:gap-2">
                  <Activity className="h-4 w-4 text-ocean-700 dark:text-ocean-100" aria-hidden="true" />
                  {graph.nodes.length} technologies / {graph.links.length} routes
                </div>
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark((value) => !value)} />
              </div>
            </div>
            <SearchBox value={explorer.searchQuery} onChange={explorer.setSearchQuery} />
          </div>
        </header>

        <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:px-8">
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <FilterPanel options={filterOptions} value={explorer.filters} onChange={explorer.setFilters} />
          </aside>

          <section className="min-h-[620px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <SankeyDiagram
              graph={graph}
              activeLinkIds={explorer.activeLinkIds}
              activeNodeIds={explorer.activeNodeIds}
              highlightedNodeIds={explorer.highlightedNodeIds}
              selectedNodeId={explorer.selectedNodeId}
              onHoverNode={explorer.setHoverNodeId}
              onSelectNode={explorer.setSelectedNodeId}
              getNodeLabel={(node) => node.label}
              getNodeCategory={(node) => node.type}
            />
          </section>

          <aside className="lg:sticky lg:top-4 lg:self-start">
            <NodeDetailsPanel node={explorer.selectedNode} relatedNodes={explorer.relatedNodes} onClose={explorer.clearSelection} />
          </aside>
        </div>
      </main>
    </div>
  );
}
