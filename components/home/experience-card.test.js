import { render, screen } from "@testing-library/react";
import ExperienceCard from "./experience-card.js";

jest.mock("next/image", () => {
  const MockedImage = (props) => <img {...props} alt={props.alt || "image"} />;
  MockedImage.displayName = "MockedNextImage";
  return MockedImage;
});

const mockEl = {
  src: "/icon.png",
  title: "Test Title",
  text: "Test description",
};

describe("ExperienceCard", () => {
  test("renders title, text and image with alt", () => {
    render(<ExperienceCard el={mockEl} index={0} length={2} variant="light" />);

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Test Title",
    );
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
  });

  test("applies border when not last item", () => {
    const { container } = render(
      <ExperienceCard el={mockEl} index={0} length={2} variant="light" />,
    );
    expect(container.firstChild).toHaveClass("border-b-[0.5px]");
  });

  test("does not apply border when last item", () => {
    const { container } = render(
      <ExperienceCard el={mockEl} index={1} length={2} variant="light" />,
    );
    expect(container.firstChild).not.toHaveClass("border-b-[0.5px]");
  });

  test("applies correct classes based on variant", () => {
    const { container, rerender } = render(
      <ExperienceCard el={mockEl} index={0} length={2} variant="light" />,
    );
    expect(container.firstChild).toHaveClass("border-accent-secondary");

    rerender(
      <ExperienceCard el={mockEl} index={0} length={2} variant="dark" />,
    );
    expect(container.firstChild).toHaveClass("border-accent");
  });
});
