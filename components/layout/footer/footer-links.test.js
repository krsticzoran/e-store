import { render, screen } from "@testing-library/react";
import FooterLinks from "./footer-links";
import "@testing-library/jest-dom";

// Sample data to pass as props
const sampleData = [
  ["home", "/"],
  ["about us", "/about"],
  ["contact", "/contact"],
];

describe("FooterLinks component", () => {
  test("renders the title and all links correctly", () => {
    render(
      <FooterLinks title="Quick Links" data={sampleData} addMargin={true} />,
    );

    // Check if title is rendered
    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    // Check if all link texts are rendered
    sampleData.forEach(([text]) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    // Check href attribute for each link
    sampleData.forEach(([text, href]) => {
      const link = screen.getByText(text).closest("a");
      expect(link).toHaveAttribute("href", href);
    });

    // Check if the margin class is applied
    const container = screen.getByText("Quick Links").parentElement;
    expect(container).toHaveClass("mr-20");
  });

  test("does not apply margin class when addMargin is false", () => {
    render(<FooterLinks title="Links" data={sampleData} addMargin={false} />);
    const container = screen.getByText("Links").parentElement;
    expect(container).not.toHaveClass("mr-20");
  });
});
