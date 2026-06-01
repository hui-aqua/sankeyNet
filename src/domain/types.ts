export type NodeCategory =
  | "material"
  | "fiber"
  | "yarn"
  | "twine"
  | "net"
  | "treatment"
  | "performance"
  | "application";

export interface TechnologyNode {
  id: string;
  label: string;
  type: NodeCategory;
  description: string;
  image?: string;
  references: TechnologyReference[];
  relatedTechnologyIds?: string[];
}

export interface TechnologyReference {
  title: string;
  url: string;
  publisher?: string;
  year?: number;
}

export interface TechnologyLink {
  source: string;
  target: string;
  value: number;
}

export interface TechnologyDataset {
  nodes: TechnologyNode[];
  links: TechnologyLink[];
}

export interface GraphNode<TNode = TechnologyNode> {
  id: string;
  data: TNode;
}

export interface GraphLink<TLink = TechnologyLink> {
  source: string;
  target: string;
  value: number;
  data: TLink;
}

export interface Graph<TNode = TechnologyNode, TLink = TechnologyLink> {
  nodes: GraphNode<TNode>[];
  links: GraphLink<TLink>[];
}

export interface ExplorerFilters {
  materialIds: string[];
  netTypeIds: string[];
  performanceIds: string[];
  applicationIds: string[];
}

export interface ConnectedPaths {
  nodeIds: Set<string>;
  linkIds: Set<string>;
  upstreamNodeIds: Set<string>;
  downstreamNodeIds: Set<string>;
}
