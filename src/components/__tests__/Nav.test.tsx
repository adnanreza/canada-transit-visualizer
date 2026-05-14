import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../Nav";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Nav />
    </MemoryRouter>,
  );

describe("<Nav />", () => {
  it("renders the brand link to home", () => {
    renderAt("/");
    expect(
      screen.getByRole("link", { name: /canada transit visualizer/i }),
    ).toHaveAttribute("href", "/");
  });

  it("marks the home link as active on /", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks the accessibility link as active on /accessibility", () => {
    renderAt("/accessibility");
    expect(screen.getByRole("link", { name: "Accessibility" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
