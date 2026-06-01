import rawDataset from "../data/aquaculture-networks.json";
import { createGraph } from "../domain/graph";
import type { Graph, TechnologyDataset, TechnologyLink, TechnologyNode } from "../domain/types";

export function loadTechnologyGraph(): Graph<TechnologyNode, TechnologyLink> {
  return createGraph(rawDataset as TechnologyDataset);
}
