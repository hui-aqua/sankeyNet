import { Search, X } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="relative block max-w-2xl">
      <span className="sr-only">Search technologies</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        className="w-full rounded-md border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-ocean-900"
        placeholder='Search routes, e.g. "Braided" or "Low Fouling"'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 rounded p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </label>
  );
}
