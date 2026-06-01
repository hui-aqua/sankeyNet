import { describe, expect, it } from "vitest";
import { createGraph, findConnectedPaths } from "../graph";
import type { TechnologyDataset } from "../types";

const dataset: TechnologyDataset = {
  nodes: [
    { id: "pe", label: "PE", type: "material", description: "Polyethylene", references: [] },
    { id: "mono", label: "Monofilament", type: "fiber", description: "Single filament", references: [] },
    { id: "net", label: "Knotless", type: "net", description: "Knotless net", references: [] },
    { id: "app", label: "Offshore", type: "application", description: "Offshore farming", references: [] }
  ],
  links: [
    { source: "pe", target: "mono", value: 10 },
    { source: "mono", target: "net", value: 10 },
    { source: "net", target: "app", value: 10 }
  ]
};

describe("graph domain model", () => {
  it("creates a reusable graph from dataset JSON", () => {
    const graph = createGraph(dataset);

    expect(graph.nodes).toHaveLength(4);
    expect(graph.links[0]).toMatchObject({
      source: "pe",
      target: "mono",
      value: 10
    });
  });

  it("finds upstream and downstream paths for a node", () => {
    const graph = createGraph(dataset);
    const paths = findConnectedPaths(graph, "net");

    expect([...paths.upstreamNodeIds]).toEqual(["mono", "pe"]);
    expect([...paths.downstreamNodeIds]).toEqual(["app"]);
    expect(paths.linkIds).toContain("mono->net");
    expect(paths.linkIds).toContain("net->app");
  });

  it("throws when links reference missing nodes", () => {
    expect(() =>
      createGraph({
        nodes: dataset.nodes,
        links: [{ source: "missing", target: "mono", value: 1 }]
      })
    ).toThrow("Missing source node");
  });
});
