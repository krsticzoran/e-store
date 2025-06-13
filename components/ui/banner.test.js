import { render, screen } from "@testing-library/react";
import Banner from "./banner.js";

// Mock next/image to prevent issues in the test environment
jest.mock(
  "next/image",
  () =>
    function MockImage(props) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} alt={props.alt || "mocked image"} />;
    },
);

// Mock background image import
jest.mock("@/public/images/bg_shop.webp", () => "/mocked-image.jpg");

describe("Banner component", () => {
  it("renders title correctly in an h1 element", () => {
    render(<Banner title="Tea Shop" />);

    // Assert the text is rendered
    const title = screen.getByText("Tea Shop");
    expect(title).toBeInTheDocument();

    // Assert it's inside an h1 element
    expect(title.tagName).toBe("H1");
  });

  it("renders background image", () => {
    const { container } = render(<Banner title="Tea Shop" />);

    // Find the img element
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();

    // Check if the mocked image is used as src
    expect(img).toHaveAttribute("src", "/mocked-image.jpg");
  });
});
