import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";
import type { Graph } from "../domain/types";

export interface SankeyLayoutNode<TNode> {
  id: string;
  data: TNode;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  value: number;
}

export interface SankeyLayoutLink<TNode, TLink> {
  id: string;
  source: SankeyLayoutNode<TNode>;
  target: SankeyLayoutNode<TNode>;
  value: number;
  width: number;
  path: string;
  data: TLink;
}

export interface SankeyLayout<TNode, TLink> {
  nodes: SankeyLayoutNode<TNode>[];
  links: SankeyLayoutLink<TNode, TLink>[];
}

interface InternalNode<TNode> {
  id: string;
  data: TNode;
}

interface InternalLink<TLink> {
  source: string;
  target: string;
  value: number;
  data: TLink;
}

export function createSankeyLayout<TNode, TLink>(
  graph: Graph<TNode, TLink>,
  width: number,
  height: number
): SankeyLayout<TNode, TLink> {
  const generator = sankey<InternalNode<TNode>, InternalLink<TLink>>()
    .nodeId((node) => node.id)
    .nodeAlign(sankeyJustify)
    .nodeWidth(18)
    .nodePadding(18)
    .extent([
      [16, 16],
      [width - 16, height - 16]
    ]);

  const layout = generator({
    nodes: graph.nodes.map((node) => ({ id: node.id, data: node.data })),
    links: graph.links.map((link) => ({
      source: link.source,
      target: link.target,
      value: link.value,
      data: link.data
    }))
  });

  const path = sankeyLinkHorizontal<InternalNode<TNode>, InternalLink<TLink>>();

  return {
    nodes: layout.nodes.map((node) => ({
      id: node.id,
      data: node.data,
      x0: node.x0 ?? 0,
      x1: node.x1 ?? 0,
      y0: node.y0 ?? 0,
      y1: node.y1 ?? 0,
      value: node.value ?? 0
    })),
    links: layout.links.map((link) => {
      const source = link.source as typeof layout.nodes[number];
      const target = link.target as typeof layout.nodes[number];
      return {
        id: `${source.id}->${target.id}`,
        source: {
          id: source.id,
          data: source.data,
          x0: source.x0 ?? 0,
          x1: source.x1 ?? 0,
          y0: source.y0 ?? 0,
          y1: source.y1 ?? 0,
          value: source.value ?? 0
        },
        target: {
          id: target.id,
          data: target.data,
          x0: target.x0 ?? 0,
          x1: target.x1 ?? 0,
          y0: target.y0 ?? 0,
          y1: target.y1 ?? 0,
          value: target.value ?? 0
        },
        value: link.value,
        width: Math.max(1, link.width ?? 1),
        path: path(link) ?? "",
        data: link.data
      };
    })
  };
}
