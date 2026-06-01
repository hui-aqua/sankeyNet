import { useMemo, useState } from "react";
import { findFilterMatches } from "../domain/filters";
import { findConnectedPaths, getNodeById, getRelatedNodes, linkId } from "../domain/graph";
import { searchGraph } from "../domain/search";
import type { ConnectedPaths, ExplorerFilters, Graph, TechnologyNode } from "../domain/types";

export interface ExplorerState {
  filters: ExplorerFilters;
  hoverNodeId: string | null;
  searchQuery: string;
  selectedNode: TechnologyNode | null;
  selectedNodeId: string | null;
  relatedNodes: TechnologyNode[];
  activeNodeIds: Set<string>;
  activeLinkIds: Set<string>;
  highlightedNodeIds: Set<string>;
  connectedPaths: ConnectedPaths | null;
  setFilters: (filters: ExplorerFilters) => void;
  setHoverNodeId: (nodeId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  clearSelection: () => void;
}

export function useGraphExplorer(graph: Graph, initialFilters: ExplorerFilters): ExplorerState {
  const [filters, setFilters] = useState<ExplorerFilters>(initialFilters);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("pe");
  const [searchQuery, setSearchQuery] = useState("");

  const interactionNodeId = hoverNodeId ?? selectedNodeId;

  const connectedPaths = useMemo(
    () => (interactionNodeId ? findConnectedPaths(graph, interactionNodeId) : null),
    [graph, interactionNodeId]
  );
  const searchMatches = useMemo(() => searchGraph(graph, searchQuery), [graph, searchQuery]);
  const searchConnectedPaths = useMemo(
    () => [...searchMatches].map((nodeId) => findConnectedPaths(graph, nodeId)),
    [graph, searchMatches]
  );
  const filterMatches = useMemo(() => findFilterMatches(graph, filters), [graph, filters]);

  const activeNodeIds = useMemo(() => {
    const active = new Set<string>();

    if (connectedPaths) {
      connectedPaths.nodeIds.forEach((nodeId) => active.add(nodeId));
    }

    if (searchMatches.size > 0) {
      searchConnectedPaths.forEach((paths) => paths.nodeIds.forEach((nodeId) => active.add(nodeId)));
    }

    if (filterMatches.size > 0) {
      filterMatches.forEach((nodeId) => active.add(nodeId));
    }

    return active;
  }, [connectedPaths, filterMatches, searchConnectedPaths, searchMatches.size]);

  const activeLinkIds = useMemo(() => {
    const active = new Set<string>();

    if (connectedPaths) {
      connectedPaths.linkIds.forEach((id) => active.add(id));
    }

    searchConnectedPaths.forEach((paths) => paths.linkIds.forEach((id) => active.add(id)));

    for (const link of graph.links) {
      const linkIsInFilterRoute = filterMatches.size > 0 && activeNodeIds.has(link.source) && activeNodeIds.has(link.target);
      if (linkIsInFilterRoute) {
        active.add(linkId(link));
      }
    }

    return active;
  }, [activeNodeIds, connectedPaths, filterMatches.size, graph.links, searchConnectedPaths]);

  const selectedNode = useMemo(
    () => (selectedNodeId ? getNodeById(graph, selectedNodeId) ?? null : null),
    [graph, selectedNodeId]
  );

  const relatedNodes = useMemo(() => (selectedNode ? getRelatedNodes(graph, selectedNode) : []), [graph, selectedNode]);

  return {
    filters,
    hoverNodeId,
    searchQuery,
    selectedNode,
    selectedNodeId,
    relatedNodes,
    activeNodeIds,
    activeLinkIds,
    highlightedNodeIds: searchMatches,
    connectedPaths,
    setFilters,
    setHoverNodeId,
    setSearchQuery,
    setSelectedNodeId,
    clearSelection: () => setSelectedNodeId(null)
  };
}
