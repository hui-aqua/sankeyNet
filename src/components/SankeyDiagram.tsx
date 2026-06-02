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
        data.addRows([
          ['PA6', 'Polyamide family', 6],
          ['HDPE', 'Polyethylene family', 3],
          ['UHMWPE', 'Polyethylene family', 1],
          ['PET', 'Polyester family', 2],
          ['Brass', 'Metal alloy', 1],
          ['Silicon Bronze', 'Metal alloy', 1],
          ['Copper Nickel', 'Metal alloy', 1],
          ['Polyamide family', 'Synthetic material', 6],
          ['Polyester family', 'Synthetic material', 2],
          ['Polyethylene family', 'Synthetic material', 4],
          ['Metal alloy', 'Metal material', 3],
          ['Synthetic material', 'Multifilament', 10],
          ['Synthetic material', 'Monofilament', 1.5],
          ['Synthetic material', 'Split-film', 0.5],
          ['Metal material', 'Metal wire', 3],
          ['Multifilament', 'Yarn', 5],
          ['Multifilament', 'Twisted twine', 4],
          ['Multifilament', 'Braided twine', 1],
          ['Monofilament', 'Mono filament', 1.5],
          ['Split-film', 'Split-film tape', 0.5],
          ['Metal wire', 'Wire', 3],
          ['Yarn', 'Raschel knitting', 5],
          ['Twisted twine', 'Knotting', 4],
          ['Braided twine', 'Knotless braiding', 1],
          ['Mono filament', 'Welding', 1.5],
          ['Wire', 'Wire weaving', 3],
          ['Split-film tape', 'Warp knitting', 0.5],
          ['Raschel knitting', 'Knotless', 5],
          ['Knotting', 'Knotted', 4],
          ['Knotless braiding', 'Knotless', 1],
          ['Welding', 'Welded', 1.5],
          ['Wire weaving', 'Knotless', 3],
          ['Warp knitting', 'Knotless', 0.5],
          ['Knotless', 'Diamond', 6],
          ['Knotless', 'Hexagonal', 2],
          ['Knotless', 'Square', 1.5],
          ['Knotted', 'Diamond', 4],
          ['Welded', 'Square', 1.5],
          ['Diamond', 'Coated', 6],
          ['Diamond', 'Untreated', 4],
          ['Hexagonal', 'Coated', 1],
          ['Hexagonal', 'Untreated', 1],
          ['Square', 'Coated', 1],
          ['Square', 'Untreated', 2],
          ['Coated', 'Non-recyclable', 6],
          ['Coated', 'Recyclable', 2],
          ['Untreated', 'Non-recyclable', 1],
          ['Untreated', 'Recyclable', 6]
        ]);

        const width = containerRef.current.offsetWidth;
        const height = Math.round(width / 2);
        const options = { width, height };
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
