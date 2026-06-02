import { SankeyDiagram } from "./components/SankeyDiagram";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 p-4">
      <div className="overflow-x-auto">
        <SankeyDiagram />
      </div>
    </main>
  );
}