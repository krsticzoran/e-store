import { render, screen } from "@testing-library/react";
import SocialIcons from "./social-icons";

describe("SocialIcons", () => {
  const mockEl = {
    link: "https://github.com",
    src: "fa-github",
    title: "GitHub",
  };

  it("renders icon with correct classes and link", () => {
    render(<SocialIcons el={mockEl} iconStyle="text-xl" />);

    const icon = screen.getByLabelText("GitHub");

    // Check if it contains required classes
    expect(icon).toHaveClass("fab");
    expect(icon).toHaveClass("fa-github");
    expect(icon).toHaveClass("text-xl");

    // Check if the link is rendered correctly
    const link = icon.closest("a");
    expect(link).toHaveAttribute("href", "https://github.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
