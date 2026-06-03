// src/components/SankeyDiagram.tsx
import { useEffect, useRef, useState } from "react";
import { NODE_DETAILS, NodeContent } from "./sankeyData";

declare global {
  interface Window {
    Plotly?: {
      react: (el: HTMLDivElement | null, data: unknown[], layout: unknown, config?: unknown) => void;
      purge: (el: HTMLDivElement | null) => void;
      [key: string]: unknown;
    };
  }
}

// 1. Strict lint compliance: Define explicit internal structures instead of using 'any'
interface PlotlyNodeData {
  label: string;
}

interface PlotlyLinkData {
  link: {
    source: PlotlyNodeData;
    target: PlotlyNodeData;
    value: number;
  };
}

interface PlotlyDOMElement extends HTMLElement {
  __data__?: PlotlyLinkData;
}

export function SankeyDiagram() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 2. Lint warning fix: Freeze ref pointer target locally for the safe cleanup function
    const currentContainer = containerRef.current;

    function loadPlotly() {
      return new Promise<void>((resolve) => {
        if (window.Plotly) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.plot.ly/plotly-2.30.0.min.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }

    async function draw() {
      await loadPlotly();
      if (cancelled || !currentContainer || !window.Plotly) return;
      const rows = [
        // 1. Material Type -> Material Family
        ['Synthetic material', 'Polyamide family', 5],
        ['Synthetic material', 'Polyester family', 1.7],
        ['Synthetic material', 'Polyethylene family', 3.3],
        ['Metal material', 'Steel family', 0.2],
        ['Metal material', 'Copper Alloy family', 0.3],

        // 2. Material Family -> Raw Material
        ['Polyamide family', 'PA6', 4.05],
        ['Polyamide family', 'PA66', 0.9],
        ['Polyamide family', 'PA610, PA612, etc.', 0.05],
        ['Polyethylene family', 'HDPE', 2.64],
        ['Polyethylene family', 'UHMWPE', 0.66],
        ['Polyester family', 'PET', 1.65],
        ['Polyester family', 'PEN, PBT, PTT, etc.', 0.05],
        ['Steel family', 'Stainless Steel', 0.1],
        ['Steel family', 'Galvanized Steel', 0.1],
        ['Copper Alloy family', 'Brass', 0.1],
        ['Copper Alloy family', 'Silicon Bronze', 0.1],
        ['Copper Alloy family', 'Copper Nickel', 0.1],

        // 3. Raw Material -> Fiber Level (Best guess for distribution)
        ['PA6', 'Multifilament', 4.05],
        ['PA66', 'Multifilament', 0.9],
        ['PA610, PA612, etc.', 'Multifilament', 0.05],
        ['PET', 'Multifilament', 1.65],
        ['PEN, PBT, PTT, etc.', 'Multifilament', 0.05],
        ['HDPE', 'Multifilament', 2.05],
        ['HDPE', 'Monofilament', 0.15],
        ['HDPE', 'Split-film', 0.44],
        ['UHMWPE', 'Monofilament', 0.66],
        ['Stainless Steel', 'Monofilament', 0.1],
        ['Galvanized Steel', 'Monofilament', 0.1],
        ['Brass', 'Monofilament', 0.1],
        ['Silicon Bronze', 'Monofilament', 0.1],
        ['Copper Nickel', 'Monofilament', 0.1],

        // Yarn/Twine level
        ['Multifilament', 'Yarn', 4.38],
        ['Multifilament', 'Twisted twine', 3.5],
        ['Multifilament', 'Braided twine', 0.87],
        
        // special case: Monofilament and split-film can be directly used as netting material without yarn manufacturing step, so it connects to both net manufacturing and mesh structure levels
        ['Monofilament', 'Knitting', 0.31],
        ['Monofilament', 'Weaving', 1],
        ['Split-film', 'Knitting', 0.44],

        // Net manufacturing
        ['Yarn', 'Knitting', 3.55],
        ['Yarn', 'Weaving', 0.83],
        ['Twisted twine', 'Knotting', 3.5],
        ['Braided twine', 'Knotting', 0.37],
        ['Braided twine', 'Weaving', 0.5],
        

        // Mesh connection
        ['Knitting', 'Knotless', 4.30],
        ['Knotting', 'Knotted', 3.87],
        ['Weaving', 'Knotless', 2.33],

        // Mesh shape
        ['Knotted', 'Rhombus (Square)', 3.87],
        ['Knotless', 'Rhombus (Square)', 5.00],
        ['Knotless', 'Hexagonal', 1.63],

        // Treatment
        ['Rhombus (Square)', 'Untreated', 3.10],
        ['Rhombus (Square)', 'Antifouling Treatment', 5.77],
        ['Hexagonal', 'Untreated', 1.06],
        ['Hexagonal', 'Antifouling Treatment', 0.57],

        // recyclable End-of-Life
        ['Untreated', 'Recyclable', 3.74],
        ['Untreated', 'Non-recyclable', 0.42],
        ['Antifouling Treatment', 'Recyclable', 3.17],
        ['Antifouling Treatment', 'Non-recyclable', 3.17],
      ];

      const labels = Array.from(new Set(rows.flatMap((row) => [String(row[0]), String(row[1])])));

      const indexMap = labels.reduce<Record<string, number>>((acc, label, idx) => {
        acc[label] = idx;
        return acc;
      }, {});

      const source = rows.map((row) => indexMap[row[0]]);
      const target = rows.map((row) => indexMap[row[1]]);
      const value = rows.map((row) => row[2]);

      const colors = {
        red: "#ff6b6b", blue: "#4dabf7", yellow: "#ffd43b",
        green: "#61e786", orange: "#f79316", teal: "#0ea5a4",
        purple: "#8b5cf6", pink: "#ec4899", brown: "#b76e79", gray: "#475569",
      } as const;

      const colorMap: Record<string, string> = {
        PA6: colors.gray, PA66: colors.gray, 'PA610, PA612, etc.': colors.gray,
        HDPE: colors.blue, UHMWPE: colors.blue, PET: colors.green,
        'PEN, PBT, PTT, etc.': colors.green, Brass: colors.orange,
        'Silicon Bronze': colors.orange, 'Copper Nickel': colors.orange,
        'Stainless Steel': colors.yellow, 'Galvanized Steel': colors.yellow,
        'Polyamide family': colors.gray, 'Polyester family': colors.green,
        'Polyethylene family': colors.blue, 'Copper Alloy family': colors.orange,
        'Steel family': colors.yellow, 'Synthetic material': colors.teal,
        'Metal material': colors.yellow, Multifilament: colors.teal,
        Monofilament: colors.yellow, 'Split-film': colors.purple,
        Yarn: colors.green, 'Twisted twine': colors.gray, 'Braided twine': colors.blue,
        'Mono filament': colors.yellow, Knitting: colors.green, Knotting: colors.gray,
        Weaving: colors.blue, Knotted: colors.gray, Knotless: colors.green,
        'Rhombus (Square)': colors.green, Hexagonal: colors.blue,
        Untreated: colors.gray, 'Antifouling Treatment': colors.green,
        Recyclable: colors.green, 'Non-recyclable': colors.red,
      };

      const nodeColors = labels.map((label) => colorMap[label] ?? "#94a3b8");
      const linkColors = value.map(() => "rgba(128, 128, 128, 0.4)");

      const width = currentContainer.offsetWidth;
      const height = Math.round(width / 2.5);

      const dataPlot = [
        {
          type: "sankey",
          orientation: "h",
          node: {
            label: labels,
            color: nodeColors,
            pad: 15,
            thickness: 20,
            line: { color: "#444", width: 0.5 },
          },
          link: { source, target, value, color: linkColors },
        },
      ];

      const layout = {
        title: {
          text:
            'Global Aquaculture Netting Technology Landscape' +
            '<br><span style="font-size:16px;color:gray">' +
            'An Interactive Knowledge Map of Materials, Structures, Manufacturing and Sustainability' +
            '</span>',
          font: { size: 28 },
          x: 0.5,
          xanchor: "center",
        },
        width,
        height,
        margin: { l: 10, r: 10, t: 60, b: 0 },
      };

      window.Plotly.purge(currentContainer);

      const cleanData = JSON.parse(JSON.stringify(dataPlot));
      const cleanLayout = JSON.parse(JSON.stringify(layout));

      window.Plotly.react(currentContainer, cleanData, cleanLayout, { responsive: true });
    }

    draw();
    window.addEventListener("resize", draw);
// ROBUST CLICK DELEGATION: Makes text labels AND large colored rectangle nodes effortlessly clickable
    const nativeClickHandler = (e: MouseEvent) => {
      const target = e.target as PlotlyDOMElement | null;
      if (!target) return;

      console.log("DOM element targeted under mouse pointer:", target);

      let clickedLabel = "";
      
      // 1. Direct Check: Did they tap text or a styled node label?
      if (target.tagName === "text" || target.classList.contains("node-label")) {
        clickedLabel = target.textContent?.trim() || "";
      } 
      // 2. Structural Check: Did they tap the colored vertical rectangle shape?
      else if (target.closest(".sankey-node")) {
        const textEl = target.closest(".sankey-node")?.querySelector("text");
        clickedLabel = textEl?.textContent?.trim() || "";
      } 
      // 3. Flow Link Check: Did they tap a band between nodes?
      else if (target.classList.contains("sankey-link") || target.closest(".sankey-link")) {
        const linkData = target.__data__;
        if (linkData?.link) {
          clickedLabel = linkData.link.source.label || "";
        }
      }

      // 4. Hit-Test Fallback: If Plotly's drag pane captures the pointer, peek directly underneath the mouse coordinates
      if (!clickedLabel) {
        const elementsUnderMouse = document.elementsFromPoint(e.clientX, e.clientY);
        for (const element of elementsUnderMouse) {
          const typedElement = element as PlotlyDOMElement;
          
          // Check if the element or its parent group is a valid Sankey Node block
          const parentNodeGroup = typedElement.closest(".sankey-node");
          if (parentNodeGroup) {
            const labelText = parentNodeGroup.querySelector("text")?.textContent;
            if (labelText) {
              clickedLabel = labelText.trim();
              break;
            }
          }
          
          // Check if it's an underlying link path
          if (typedElement.classList.contains("sankey-link") || typedElement.__data__?.link) {
            const dataObj = typedElement.__data__;
            if (dataObj?.link?.source?.label) {
              clickedLabel = dataObj.link.source.label.trim();
              break;
            }
          }
        }
      }

      console.log("Final matched label text value:", clickedLabel);

      if (clickedLabel) {
        const content = NODE_DETAILS[clickedLabel] || {
          title: clickedLabel,
          description: `Detailed technical specifications and environmental profiles for ${clickedLabel} are under compilation for Future Net Explorer.`
        };
        setSelectedNode(content);
      }
    };
    if (currentContainer) {
      currentContainer.addEventListener("click", nativeClickHandler);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", draw);
      if (currentContainer) {
        currentContainer.removeEventListener("click", nativeClickHandler);
        window.Plotly?.purge(currentContainer);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 640 }}>
      <div ref={containerRef} style={{ width: "100%", aspectRatio: "1 / 2", minHeight: 640 }} />

      {selectedNode && (
        <div 
          style={{
            position: "fixed", top: 0, right: 0, bottom: 0, left: 0,
            backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 99999
          }} 
          onClick={() => setSelectedNode(null)}
        >
          <div 
            style={{
              backgroundColor: "#fff", padding: "24px", borderRadius: "12px",
              maxWidth: "500px", width: "90%", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", color: "#333"
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>{selectedNode.title}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#888" }}
              >
                ✕
              </button>
            </div>

            {selectedNode.imageUrl && (
              <img 
                src={selectedNode.imageUrl} 
                alt={selectedNode.title} 
                style={{ width: "100%", height: "auto", borderRadius: "6px", marginBottom: "16px", objectFit: "cover" }} 
              />
            )}

            <p style={{ margin: 0, lineHeight: "1.1", color: "#4b5563" }}>
              {selectedNode.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}