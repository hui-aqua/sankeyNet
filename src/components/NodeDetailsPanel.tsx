import { ExternalLink, X } from "lucide-react";
import type { TechnologyNode } from "../domain/types";

interface NodeDetailsPanelProps {
  node: TechnologyNode | null;
  relatedNodes: TechnologyNode[];
  onClose: () => void;
}

export function NodeDetailsPanel({ node, relatedNodes, onClose }: NodeDetailsPanelProps) {
  if (!node) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        Select a node in the Sankey diagram to inspect descriptions, references, imagery, and related technologies.
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900">
      {node.image ? (
        <img src={node.image} alt="" className="h-44 w-full object-cover" loading="lazy" />
      ) : null}

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ocean-700 dark:text-ocean-100">{node.type}</p>
            <h2 className="text-2xl font-semibold tracking-tight">{node.label}</h2>
          </div>
          <button
            type="button"
            className="rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{node.description}</p>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-slate-950 dark:text-slate-100">Related Technologies</h3>
          {relatedNodes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {relatedNodes.map((related) => (
                <span
                  key={related.id}
                  className="rounded bg-ocean-50 px-2 py-1 text-xs font-medium text-ocean-700 dark:bg-ocean-900 dark:text-ocean-100"
                >
                  {related.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No related technologies listed.</p>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-slate-950 dark:text-slate-100">References</h3>
          {node.references.length > 0 ? (
            <ul className="space-y-2">
              {node.references.map((reference) => (
                <li key={reference.url}>
                  <a
                    className="inline-flex items-center gap-1 text-sm font-medium text-ocean-700 hover:underline dark:text-ocean-100"
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reference.title}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {[reference.publisher, reference.year].filter(Boolean).join(" / ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">References can be added in the JSON dataset.</p>
          )}
        </section>
      </div>
    </article>
  );
}
