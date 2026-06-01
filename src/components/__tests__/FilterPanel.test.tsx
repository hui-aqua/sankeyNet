import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterPanel } from "../FilterPanel";
import { emptyFilters } from "../../domain/filters";

describe("FilterPanel", () => {
  it("emits updated filters when an option is toggled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterPanel
        value={emptyFilters}
        onChange={onChange}
        options={{
          materials: [{ id: "pe", label: "PE" }],
          netTypes: [{ id: "knotless", label: "Knotless Net" }],
          performanceProperties: [{ id: "low", label: "Low Fouling" }],
          applications: [{ id: "offshore", label: "Offshore Salmon" }]
        }}
      />
    );

    await user.click(screen.getByLabelText("PE"));

    expect(onChange).toHaveBeenCalledWith({
      ...emptyFilters,
      materialIds: ["pe"]
    });
  });
});
