import { render, screen } from "@testing-library/react";
import Experience from "./experience";

jest.mock("@/components/home/card-slider", () => {
  const MockCardSlider = ({ items }) => (
    <div data-testid="mock-card-slider">{items.length} items</div>
  );
  MockCardSlider.displayName = "MockCardSlider";
  return MockCardSlider;
});

jest.mock("@/components/home/experience-card", () => {
  const MockExperienceCard = ({ el, index, variant, length }) => (
    <div
      data-testid="mock-experience-card"
      data-variant={variant}
      data-index={index}
    >
      {el.title}
    </div>
  );
  MockExperienceCard.displayName = "MockExperienceCard";
  return MockExperienceCard;
});

jest.mock("./animated-decorations", () => {
  const MockAnimatedDecorations = () => (
    <div data-testid="mock-animated-decorations" />
  );
  MockAnimatedDecorations.displayName = "MockAnimatedDecorations";
  return MockAnimatedDecorations;
});

import { items, experienceArr, experienceArrTwo } from "@/data/homeData";

describe("Experience component", () => {
  test("renders static text and link", () => {
    render(<Experience />);

    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /The Story Behind Our Ocha House/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We also specialize in bubble tea/i),
    ).toBeInTheDocument();

    const learnMoreLink = screen.getByRole("link", { name: /learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute("href", "/about");
    expect(learnMoreLink).toHaveAttribute("aria-label", "Learn more about us");
  });

  test("renders CardSlider with correct items prop", () => {
    render(<Experience />);
    const cardSlider = screen.getByTestId("mock-card-slider");
    expect(cardSlider).toBeInTheDocument();
    expect(cardSlider).toHaveTextContent(String(items.length));
  });

  test("renders correct number of ExperienceCard components for both arrays", () => {
    render(<Experience />);

    const lightCards = screen
      .getAllByTestId("mock-experience-card")
      .filter((el) => el.getAttribute("data-variant") === "light");
    const darkCards = screen
      .getAllByTestId("mock-experience-card")
      .filter((el) => el.getAttribute("data-variant") === "dark");

    expect(lightCards).toHaveLength(experienceArr.length);
    expect(darkCards).toHaveLength(experienceArrTwo.length);
  });

  test("renders AnimatedDecorations component", () => {
    render(<Experience />);
    expect(screen.getByTestId("mock-animated-decorations")).toBeInTheDocument();
  });
});
