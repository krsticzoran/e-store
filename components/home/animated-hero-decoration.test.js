import { render, screen } from "@testing-library/react";
import AnimatedHeoDecorations from "./animated-hero-decoration.js";

jest.mock("next/image", () => {
  const MockedImage = (props) => <img {...props} alt={props.alt || "image"} />;
  MockedImage.displayName = "MockedNextImage";
  return MockedImage;
});

class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock;

describe("AnimatedHeoDecorations", () => {
  test("renders two FadeInWrapper components with images", () => {
    render(<AnimatedHeoDecorations />);

    const images = screen.getAllByAltText("image");
    expect(images.length).toBe(2);
  });
});
