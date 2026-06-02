import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Plotly?: any;
  }
}

export function SankeyDiagram() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

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
      if (cancelled || !containerRef.current || !window.Plotly) return;

      const rows = [
        //total should be 15

        // raw material
        ['PA6', 'Polyamide family', 4.05],
        ['PA66', 'Polyamide family', 0.9],
        ['PA610, PA612, etc.', 'Polyamide family', 0.05],

        ['HDPE', 'Polyethylene family', 2.64],
        ['UHMWPE', 'Polyethylene family', 0.66],

        ['PET', 'Polyester family', 1.65],
        ['PEN, PBT, PTT, etc.', 'Polyester family', 0.05],

        ['Brass', 'Copper Alloy family', 0.1],
        ['Silicon Bronze', 'Copper Alloy family', 0.1],
        ['Copper Nickel', 'Copper Alloy family', 0.1],
        ['Stainless Steel', 'Steel family', 0.1],
        ['Galvanized Steel', 'Steel family', 0.1],

        // material level

        ['Polyamide family', 'Synthetic material', 5],
        ['Polyester family', 'Synthetic material', 1.7],
        ['Polyethylene family', 'Synthetic material', 3.3],

        ['Steel family', 'Metal material', 0.2],
        ['Copper Alloy family', 'Metal material', 0.3],

        // fiber level
        ['Synthetic material', 'Multifilament', 8.75],
        ['Synthetic material', 'Monofilament', 0.81],
        ['Synthetic material', 'Split-film', 0.44],

        ['Metal material', 'Monofilament', 0.5],

        // Yarn/Twine level

        ['Multifilament', 'Yarn', 4.38],
        ['Multifilament', 'Twisted twine', 3.5],
        ['Multifilament', 'Braided twine', 0.87],
        ['Monofilament', 'Yarn', 0.31],
        ['Monofilament', 'Mono filament', 1],
        ['Split-film', 'Yarn', 0.44],

        // Net manufacturing

        ['Yarn', 'Knitting', 4.1],
        ['Yarn', 'Weaving', 1.03],

        ['Twisted twine', 'Knotting', 3.5],

        ['Braided twine', 'Knotting', 0.37],
        ['Braided twine', 'Weaving', 0.5],

        ['Mono filament', 'Weaving', 1],

        // Mesh connection

        ['Knitting', 'Knotless', 4.10],

        ['Knotting', 'Knotted', 3.87],

        ['Weaving', 'Knotless', 2.53],

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

      const labels = Array.from(new Set(rows.flatMap((row) => [row[0], row[1]])));
      const indexMap = labels.reduce<Record<string, number>>((acc, label, idx) => {
        acc[label] = idx;
        return acc;
      }, {});

      const source = rows.map((row) => indexMap[row[0]]);
      const target = rows.map((row) => indexMap[row[1]]);
      const value = rows.map((row) => row[2]);

      const colors = {
        red: "#ff6b6b",
        blue: "#4dabf7",
        yellow: "#ffd43b",
        green: "#61e786",
        orange: "#f79316",
        teal: "#0ea5a4",
        purple: "#8b5cf6",
        pink: "#ec4899",
        brown: "#b76e79",
        gray: "#475569",
      } as const;

      const colorMap: Record<string, string> = {
        PA6: colors.gray,
        PA66: colors.gray,
        'PA610, PA612, etc.': colors.gray,

        HDPE: colors.blue,
        UHMWPE: colors.blue,

        PET: colors.green,
        'PEN, PBT, PTT, etc.': colors.green,

        Brass: colors.orange,
        'Silicon Bronze': colors.orange,
        'Copper Nickel': colors.orange,

        'Stainless Steel': colors.yellow,
        'Galvanized Steel': colors.yellow,

        // ===== Material family =====
        'Polyamide family': colors.gray,
        'Polyester family': colors.green,
        'Polyethylene family': colors.blue,

        'Copper Alloy family': colors.orange,
        'Steel family': colors.yellow,

        // ===== Material category =====
        'Synthetic material': colors.teal,
        'Metal material': colors.yellow,

        // ===== Fiber structure =====
        Multifilament: colors.teal,
        Monofilament: colors.yellow,
        'Split-film': colors.purple,

        // ===== Yarn / Twine =====
        Yarn: colors.green,
        'Twisted twine': colors.gray,
        'Braided twine': colors.blue,
        'Mono filament': colors.yellow,

        // ===== Manufacturing =====
        Knitting: colors.green,
        Knotting: colors.gray,
        Weaving: colors.blue,

        // ===== Mesh connection =====
        Knotted: colors.gray,
        Knotless: colors.green,

        // ===== Mesh shape =====
        'Rhombus (Square)': colors.green,
        Hexagonal: colors.blue,

        // ===== Treatment =====
        Untreated: colors.gray,
        'Antifouling Treatment': colors.green,

        // ===== End of life =====
        Recyclable: colors.green,
        'Non-recyclable': colors.red,
      };

      const nodeColors = labels.map((label) => colorMap[label] ?? "#94a3b8");
      const linkColors = value.map(() => "rgba(128, 128, 128, 0.4)");

      const width = containerRef.current.offsetWidth;
      const height = Math.round(width / 2);

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
          link: {
            source,
            target,
            value,
            color: linkColors,
          },
        },
      ];

      const layout = {
        title: {
          text:
            'Global Aquaculture Netting Technology Landscape' +
            '<br><span style="font-size:16px;color:gray">' +
            'An Interactive Knowledge Map of Materials, Structures, Manufacturing and Sustainability' +
            '</span>',
          font: {
            size: 28,
          },
          x: 0.5, // center
          xanchor: "center",
        },

        width,
        height,
        margin: { l: 0, r: 0, t: 60, b: 0 },
      };

      window.Plotly.react(containerRef.current, dataPlot, layout, { responsive: true });
    }

    draw();
    window.addEventListener("resize", draw);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", aspectRatio: "2 / 1", minHeight: 320 }} />;
}
