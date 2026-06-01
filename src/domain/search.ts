import type { Graph } from "./types";

const normalize = (value: string): string => value.trim().toLowerCase();

export function searchGraph(graph: Graph, query: string): Set<string> {
  const normalized = normalize(query);
  if (!normalized) {
    return new Set();
  }

  return new Set(
    graph.nodes
      .filter(({ data }) => {
        const relatedText = [
          data.label,
          data.type,
          data.description,
          ...(data.relatedTechnologyIds ?? []),
          ...data.references.flatMap((reference) => [reference.title, reference.publisher ?? ""])
        ]
          .join(" ")
          .toLowerCase();

        return relatedText.includes(normalized);
      })
      .map((node) => node.id)
  );
}
