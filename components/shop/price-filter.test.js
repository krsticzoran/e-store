import React from "react";
import { render, screen } from "@testing-library/react";
import PriceFilter from "./price-filter.js";

// Mock noUiSlider with complete implementation
jest.mock("nouislider", () => ({
  create: jest.fn((element) => {
    // Create realistic DOM structure
    const base = document.createElement("div");
    base.className = "noUi-base";

    const connect = document.createElement("div");
    connect.className = "noUi-connect";
    base.appendChild(connect);

    const handle = document.createElement("div");
    handle.className = "noUi-handle";
    base.appendChild(handle);

    element.appendChild(base);

    // Create fully mocked instance
    const mockInstance = {
      on: jest.fn(),
      off: jest.fn(),
      destroy: jest.fn(),
      get: jest.fn(() => [10, 20]),
      set: jest.fn(),
      updateOptions: jest.fn(),
      target: element,
    };

    element.noUiSlider = mockInstance;
    return mockInstance;
  }),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => "/shop"),
}));

describe("PriceFilter Component", () => {
  beforeAll(() => {
    // Safe location mock
    delete window.location;
    window.location = {
      search: "",
      href: "http://localhost/",
      toString: () => "http://localhost/",
    };
  });

  test("renders successfully", () => {
    render(<PriceFilter />);
    expect(screen.getByText("Price Filter")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("properly initializes noUiSlider", () => {
    render(<PriceFilter />);

    // Verify slider initialization
    const sliderElement = screen.getByRole("slider");
    expect(sliderElement.noUiSlider).toBeDefined();
    expect(sliderElement.querySelector(".noUi-connect")).toBeInTheDocument();
    expect(sliderElement.querySelector(".noUi-handle")).toBeInTheDocument();
  });

  test("sets up event listeners", () => {
    render(<PriceFilter />);
    const sliderElement = screen.getByRole("slider");
    expect(sliderElement.noUiSlider.on).toHaveBeenCalledWith(
      "update",
      expect.any(Function),
    );
  });
});
