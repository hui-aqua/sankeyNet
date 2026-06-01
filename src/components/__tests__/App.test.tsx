import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("App", () => {
  it("renders the explorer with search, filters, diagram, and details", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Future Net Explorer" })).toBeInTheDocument();
    expect(screen.getByLabelText("Search technologies")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /sankey diagram/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PE" })).toBeInTheDocument();
  });

  it("accepts a global search query", async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText("Search technologies");
    await user.type(search, "Braided");

    expect(search).toHaveValue("Braided");
  });
});
