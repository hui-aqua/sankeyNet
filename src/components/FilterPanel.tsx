import type { ExplorerFilters } from "../domain/types";
import type { FilterOptions } from "../domain/filters";

interface FilterPanelProps {
  options: FilterOptions;
  value: ExplorerFilters;
  onChange: (value: ExplorerFilters) => void;
}

type FilterKey = keyof ExplorerFilters;

const sections: Array<{ title: string; key: FilterKey; optionKey: keyof FilterOptions }> = [
  { title: "Material", key: "materialIds", optionKey: "materials" },
  { title: "Net Type", key: "netTypeIds", optionKey: "netTypes" },
  { title: "Performance", key: "performanceIds", optionKey: "performanceProperties" },
  { title: "Application", key: "applicationIds", optionKey: "applications" }
];

export function FilterPanel({ options, value, onChange }: FilterPanelProps) {
  const toggle = (key: FilterKey, id: string): void => {
    const current = new Set(value[key]);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }

    onChange({
      ...value,
      [key]: [...current]
    });
  };

  const hasFilters = Object.values(value).some((ids) => ids.length > 0);

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-panel dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Filters</h2>
        {hasFilters ? (
          <button
            type="button"
            className="rounded px-2 py-1 text-xs font-medium text-ocean-700 hover:bg-ocean-50 dark:text-ocean-100 dark:hover:bg-slate-800"
            onClick={() =>
              onChange({
                materialIds: [],
                netTypeIds: [],
                performanceIds: [],
                applicationIds: []
              })
            }
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <fieldset key={section.key}>
            <legend className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{section.title}</legend>
            <div className="space-y-2">
              {options[section.optionKey].map((option) => (
                <label key={option.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-ocean-700 focus:ring-ocean-500"
                    checked={value[section.key].includes(option.id)}
                    onChange={() => toggle(section.key, option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
