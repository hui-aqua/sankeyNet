import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

export function SankeyDiagram() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    function loadScript() {
      return new Promise<void>((resolve) => {
        if (window.google && window.google.charts) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://www.gstatic.com/charts/loader.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }

    async function draw() {
      await loadScript();
      if (cancelled) return;
      window.google.charts.load("current", { packages: ["sankey"] });
      window.google.charts.setOnLoadCallback(() => {
        if (!containerRef.current) return;

        const data = new window.google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
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

['Metal material', 'Monofilament', 0.50],

          // Yarn/twine  leavel

// Yarn/Twine level

['Multifilament', 'Yarn', 4.38],
['Multifilament', 'Twisted twine', 3.50],
['Multifilament', 'Braided twine', 0.87],
['Monofilament', 'Yarn', 0.31],
['Monofilament', 'Mono filament', 1],
['Split-film', 'Yarn', 0.44],

          // Net manufacturing

// Manufacturing

['Yarn', 'Knitting', 4.10],
['Yarn', 'Weaving',  1.03],

['Twisted twine', 'Knotting', 3.50],

['Braided twine', 'Knotting', 0.37],
['Braided twine', 'Weaving',  0.50],

['Mono filament', 'Weaving', 1.00],

          // Mesh connection

// Mesh connection

['Knitting', 'Knotless', 4.10],

['Knotting', 'Knotted', 3.87],

['Weaving', 'Knotless', 2.02],
['Weaving', 'Knotted', 0.51],


          // Mesh shape

['Knotted',  'Rhombus (Square)', 4.16],
['Knotted',  'Hexagonal',        0.22],

['Knotless', 'Rhombus (Square)', 4.59],
['Knotless', 'Hexagonal',        1.53],


          // Treatment
['Rhombus (Square)', 'Untreated', 3.06],
['Rhombus (Square)', 'Antifouling Treatment', 5.69],
['Hexagonal', 'Untreated', 1.14],
['Hexagonal', 'Antifouling Treatment', 0.61],

          // recyclable
// End-of-Life

['Untreated', 'Recyclable', 3.78],
['Untreated', 'Non-recyclable', 0.42],

['Antifouling Treatment', 'Recyclable', 3.15],
['Antifouling Treatment', 'Non-recyclable', 3.15],


        ];

        data.addRows(rows);

        // manual color mapping: edit the mapping below to change node colors
        const uniqueNodes = Array.from(new Set(rows.flatMap((r) => [r[0], r[1]])));
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

// Yarn / Twine

Yarn: colors.green,

'Twisted twine': colors.gray,

'Braided twine': colors.blue,

'Mono filament': colors.blue,

  // ===== Manufacturing =====

Knitting: colors.green,   // modern aquaculture

Knotting: colors.gray,    // traditional PA fisheries

Weaving: colors.blue,     // PE/mono dominated

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

        const nodeColors = uniqueNodes.map((n) => colorMap[n] ?? "#94a3b8");

        const width = containerRef.current.offsetWidth;
        const height = Math.round(width / 2);
        const options = { width, height, sankey: { node: { colors: nodeColors }, link: { colorMode: 'gradient' } } };
        const chart = new window.google.visualization.Sankey(containerRef.current);
        chart.draw(data, options);
      });
    }

    draw();
    window.addEventListener("resize", draw);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <div ref={containerRef} id="sankey_multiple" style={{ width: '100%', aspectRatio: '2 / 1', minHeight: 320 }} />;
}
