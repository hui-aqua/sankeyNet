import { useMemo } from "react";
import { createSankeyLayout } from "../visualization/sankeyLayout";
import type { Graph } from "../domain/types";
import { useElementSize } from "../hooks/useElementSize";

interface SankeyDiagramProps<TNode, TLink> {
  graph: Graph<TNode, TLink>;
  activeNodeIds: Set<string>;
  activeLinkIds: Set<string>;
  highlightedNodeIds: Set<string>;
  selectedNodeId: string | null;
  onHoverNode: (nodeId: string | null) => void;
  onSelectNode: (nodeId: string) => void;
  getNodeLabel: (node: TNode) => string;
  getNodeCategory: (node: TNode) => string;
}

const categoryColors: Record<string, string> = {
  material: "#178ea6",
  fiber: "#2e7d57",
  yarn: "#7c3aed",
  twine: "#d97706",
  net: "#dc2626",
  treatment: "#0891b2",
  performance: "#4f46e5",
  application: "#0f766e"
};

export function SankeyDiagram<TNode, TLink>({
  graph,
  activeNodeIds,
  activeLinkIds,
  highlightedNodeIds,
  selectedNodeId,
  onHoverNode,
  onSelectNode,
  getNodeLabel,
  getNodeCategory
}: SankeyDiagramProps<TNode, TLink>) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const layout = useMemo(() => createSankeyLayout(graph, size.width, size.height), [graph, size.height, size.width]);
  const hasActiveState = activeNodeIds.size > 0 || activeLinkIds.size > 0 || highlightedNodeIds.size > 0;

  return (
    <div ref={ref} className="h-[70vh] min-h-[620px] w-full">
      <svg className="h-full w-full" role="img" aria-label="Sankey diagram of aquaculture net technologies">
        <defs>
          {layout.links.map((link) => (
            <linearGradient key={link.id} id={`gradient-${safeId(link.id)}`} gradientUnits="userSpaceOnUse" x1={link.source.x1} x2={link.target.x0}>
              <stop offset="0%" stopColor={colorForCategory(getNodeCategory(link.source.data))} />
              <stop offset="100%" stopColor={colorForCategory(getNodeCategory(link.target.data))} />
            </linearGradient>
          ))}
        </defs>

        <g fill="none">
          {layout.links.map((link) => {
            const isActive = activeLinkIds.has(link.id);
            const opacity = hasActiveState ? (isActive ? 0.82 : 0.08) : 0.28;
            return (
              <path
                key={link.id}
                d={link.path}
                stroke={`url(#gradient-${safeId(link.id)})`}
                strokeWidth={link.width}
                strokeOpacity={opacity}
                className="transition-opacity duration-200"
              >
                <title>
                  {getNodeLabel(link.source.data)} to {getNodeLabel(link.target.data)}: {link.value}
                </title>
              </path>
            );
          })}
        </g>

        <g>
          {layout.nodes.map((node) => {
            const label = getNodeLabel(node.data);
            const category = getNodeCategory(node.data);
            const isActive = activeNodeIds.has(node.id);
            const isHighlighted = highlightedNodeIds.has(node.id);
            const isSelected = selectedNodeId === node.id;
            const opacity = hasActiveState ? (isActive || isHighlighted ? 1 : 0.18) : 1;
            const labelAnchor = node.x0 < size.width / 2 ? "start" : "end";
            const labelX = node.x0 < size.width / 2 ? node.x1 + 8 : node.x0 - 8;

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${label}, ${category}`}
                className="cursor-pointer outline-none transition-opacity duration-200"
                opacity={opacity}
                onMouseEnter={() => onHoverNode(node.id)}
                onMouseLeave={() => onHoverNode(null)}
                onFocus={() => onHoverNode(node.id)}
                onBlur={() => onHoverNode(null)}
                onClick={() => onSelectNode(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectNode(node.id);
                  }
                }}
              >
                <rect
                  x={node.x0}
                  y={node.y0}
                  width={Math.max(8, node.x1 - node.x0)}
                  height={Math.max(8, node.y1 - node.y0)}
                  rx={4}
                  fill={colorForCategory(category)}
                  stroke={isSelected || isHighlighted ? "#0f172a" : "transparent"}
                  strokeWidth={isSelected || isHighlighted ? 3 : 0}
                />
                <text
                  x={labelX}
                  y={(node.y0 + node.y1) / 2}
                  dy="0.35em"
                  textAnchor={labelAnchor}
                  className="fill-slate-800 text-[12px] font-semibold dark:fill-slate-100"
                >
                  {label}
                </text>
                <text
                  x={labelX}
                  y={(node.y0 + node.y1) / 2 + 15}
                  textAnchor={labelAnchor}
                  className="fill-slate-500 text-[10px] uppercase tracking-wide dark:fill-slate-400"
                >
                  {category}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function colorForCategory(category: string): string {
  return categoryColors[category] ?? "#64748b";
}

function safeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "-");
}
