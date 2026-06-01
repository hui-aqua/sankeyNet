import type { ExplorerFilters, Graph, TechnologyNode } from "./types";

export const emptyFilters: ExplorerFilters = {
  materialIds: [],
  netTypeIds: [],
  performanceIds: [],
  applicationIds: []
};

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterOptions {
  materials: FilterOption[];
  netTypes: FilterOption[];
  performanceProperties: FilterOption[];
  applications: FilterOption[];
}

export function createFilterOptions(graph: Graph): FilterOptions {
  const byType = (type: TechnologyNode["type"]): FilterOption[] =>
    graph.nodes
      .filter((node) => node.data.type === type)
      .map((node) => ({ id: node.id, label: node.data.label }))
      .sort((a, b) => a.label.localeCompare(b.label));

  return {
    materials: byType("material"),
    netTypes: byType("net"),
    performanceProperties: byType("performance"),
    applications: byType("application")
  };
}

export function findFilterMatches(graph: Graph, filters: ExplorerFilters): Set<string> {
  const selected = [
    ...filters.materialIds,
    ...filters.netTypeIds,
    ...filters.performanceIds,
    ...filters.applicationIds
  ];

  if (selected.length === 0) {
    return new Set();
  }

  const selectedByCategory = {
    material: new Set(filters.materialIds),
    net: new Set(filters.netTypeIds),
    performance: new Set(filters.performanceIds),
    application: new Set(filters.applicationIds)
  };

  const matched = new Set<string>();
  const paths = enumeratePaths(graph);

  for (const path of paths) {
    const includesAllSelectedCategories = Object.entries(selectedByCategory).every(([category, ids]) => {
      if (ids.size === 0) {
        return true;
      }
      return path.some((nodeId) => ids.has(nodeId) && graph.nodes.find((node) => node.id === nodeId)?.data.type === category);
    });

    if (includesAllSelectedCategories) {
      path.forEach((nodeId) => matched.add(nodeId));
    }
  }

  return matched;
}

function enumeratePaths(graph: Graph): string[][] {
  const outgoing = new Map<string, string[]>();
  const targets = new Set(graph.links.map((link) => link.target));

  for (const link of graph.links) {
    outgoing.set(link.source, [...(outgoing.get(link.source) ?? []), link.target]);
  }

  const roots = graph.nodes.filter((node) => !targets.has(node.id)).map((node) => node.id);
  const paths: string[][] = [];

  const walk = (nodeId: string, path: string[]): void => {
    const next = outgoing.get(nodeId) ?? [];
    if (next.length === 0) {
      paths.push([...path, nodeId]);
      return;
    }
    next.forEach((target) => walk(target, [...path, nodeId]));
  };

  roots.forEach((root) => walk(root, []));
  return paths;
}
