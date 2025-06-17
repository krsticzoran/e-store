import { render, screen } from "@testing-library/react";
import FooterLinks from "./footer-links";
import "@testing-library/jest-dom";

describe("FooterLinks", () => {
  const mockData = [
    ["About Us", "/about"],
    ["Contact", "/contact"],
  ];

  test("renders title and links", () => {
    render(<FooterLinks title="Company" data={mockData} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Company" }),
    ).toBeInTheDocument();

    const aboutUsLink = screen.getByRole("link", { name: "About Us" });
    expect(aboutUsLink).toBeInTheDocument();
    expect(aboutUsLink).toHaveAttribute("href", "/about");

    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("applies margin when addMargin is true", () => {
    const { container } = render(
      <FooterLinks title="Company" data={mockData} addMargin={true} />,
    );
    expect(container.firstChild).toHaveClass("mr-20");
  });

  test("does not apply margin when addMargin is false", () => {
    const { container } = render(
      <FooterLinks title="Company" data={mockData} addMargin={false} />,
    );
    expect(container.firstChild).not.toHaveClass("mr-20");
  });
});
