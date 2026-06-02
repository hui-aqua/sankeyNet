import { SankeyDiagram } from "./components/SankeyDiagram";

export default function App() {
  return (
    <div>
      <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100 p-4">
        <div className="mx-auto max-w-[1600px]">
          <SankeyDiagram />
        </div>
      </main>
    </div>
  );
}
