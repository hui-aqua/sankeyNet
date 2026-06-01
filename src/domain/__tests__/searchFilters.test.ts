import { describe, expect, it } from "vitest";
import { emptyFilters, findFilterMatches } from "../filters";
import { createGraph } from "../graph";
import { searchGraph } from "../search";
import type { TechnologyDataset } from "../types";

const dataset: TechnologyDataset = {
  nodes: [
    { id: "pe", label: "PE", type: "material", description: "Polyethylene", references: [] },
    { id: "braid", label: "Braided Yarn", type: "yarn", description: "Braided route", references: [] },
    { id: "net", label: "Knotless Net", type: "net", description: "Smooth net", references: [] },
    { id: "low", label: "Low Fouling", type: "performance", description: "Biofouling control", references: [] },
    { id: "offshore", label: "Offshore Salmon", type: "application", description: "Exposed farming", references: [] }
  ],
  links: [
    { source: "pe", target: "braid", value: 4 },
    { source: "braid", target: "net", value: 4 },
    { source: "net", target: "low", value: 4 },
    { source: "low", target: "offshore", value: 4 }
  ]
};

describe("search and filters", () => {
  it("matches search text across node metadata", () => {
    const graph = createGraph(dataset);

    expect(searchGraph(graph, "braided")).toEqual(new Set(["braid"]));
    expect(searchGraph(graph, "")).toEqual(new Set());
  });

  it("returns whole routes matching selected filter categories", () => {
    const graph = createGraph(dataset);

    expect(
      findFilterMatches(graph, {
        ...emptyFilters,
        materialIds: ["pe"],
        applicationIds: ["offshore"]
      })
    ).toEqual(new Set(["pe", "braid", "net", "low", "offshore"]));
  });
});
