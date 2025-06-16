import { render, screen, fireEvent } from "@testing-library/react";
import InfoOrMenuModal from "./info-or-menu-modal.js";

beforeEach(() => {
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "reusablePortal");
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  const portalRoot = document.getElementById("reusablePortal");
  if (portalRoot) {
    portalRoot.remove();
  }
});

test("modal opens on hamburger click and closes on close button click", () => {
  render(<InfoOrMenuModal className="text-primary" />);

  const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
  fireEvent.click(toggleButton);
  expect(screen.getByTestId("modal-panel")).toBeVisible();

  const closeButton = screen.getByRole("button", { name: /close modal/i });
  fireEvent.click(closeButton);
  expect(screen.queryByTestId("modal-panel")).not.toBeInTheDocument();
});
