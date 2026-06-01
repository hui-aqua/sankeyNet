import type { ConnectedPaths, Graph, TechnologyDataset, TechnologyLink, TechnologyNode } from "./types";

export const linkId = (link: Pick<TechnologyLink, "source" | "target">): string => `${link.source}->${link.target}`;

export function createGraph(dataset: TechnologyDataset): Graph<TechnologyNode, TechnologyLink> {
  const ids = new Set<string>();

  for (const node of dataset.nodes) {
    if (ids.has(node.id)) {
      throw new Error(`Duplicate node id: ${node.id}`);
    }
    ids.add(node.id);
  }

  for (const link of dataset.links) {
    if (!ids.has(link.source)) {
      throw new Error(`Missing source node: ${link.source}`);
    }
    if (!ids.has(link.target)) {
      throw new Error(`Missing target node: ${link.target}`);
    }
  }

  return {
    nodes: dataset.nodes.map((node) => ({ id: node.id, data: node })),
    links: dataset.links.map((link) => ({
      source: link.source,
      target: link.target,
      value: link.value,
      data: link
    }))
  };
}

export function findConnectedPaths(graph: Graph, nodeId: string): ConnectedPaths {
  const upstreamNodeIds = new Set<string>();
  const downstreamNodeIds = new Set<string>();
  const linkIds = new Set<string>();

  const incoming = new Map<string, typeof graph.links>();
  const outgoing = new Map<string, typeof graph.links>();

  for (const link of graph.links) {
    incoming.set(link.target, [...(incoming.get(link.target) ?? []), link]);
    outgoing.set(link.source, [...(outgoing.get(link.source) ?? []), link]);
  }

  const visitUpstream = (id: string): void => {
    for (const link of incoming.get(id) ?? []) {
      linkIds.add(linkId(link));
      if (!upstreamNodeIds.has(link.source)) {
        upstreamNodeIds.add(link.source);
        visitUpstream(link.source);
      }
    }
  };

  const visitDownstream = (id: string): void => {
    for (const link of outgoing.get(id) ?? []) {
      linkIds.add(linkId(link));
      if (!downstreamNodeIds.has(link.target)) {
        downstreamNodeIds.add(link.target);
        visitDownstream(link.target);
      }
    }
  };

  visitUpstream(nodeId);
  visitDownstream(nodeId);

  return {
    nodeIds: new Set([nodeId, ...upstreamNodeIds, ...downstreamNodeIds]),
    linkIds,
    upstreamNodeIds,
    downstreamNodeIds
  };
}

export function getNodeById(graph: Graph, nodeId: string): TechnologyNode | undefined {
  return graph.nodes.find((node) => node.id === nodeId)?.data;
}

export function getRelatedNodes(graph: Graph, node: TechnologyNode): TechnologyNode[] {
  const relatedIds = new Set(node.relatedTechnologyIds ?? []);
  return graph.nodes.filter((candidate) => relatedIds.has(candidate.id)).map((candidate) => candidate.data);
}
