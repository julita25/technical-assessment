/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render } from "@testing-library/react";
import Quiz from "../src/components/Quiz";
import { generateFakeQuiz } from "../__mocks__/quizMock";

const mockCarousel = jest.fn();
jest.mock("../src/components/Carousel", () => function (props) {
  mockCarousel(props);
  return <mock-Carousel />;
});

const mockQuizData = generateFakeQuiz();

const mockError = new Error("No quiz available");

describe("Quiz", () => {
  it("renders the Carousel component", () => {
    render(<Quiz quizData={mockQuizData} />);
    expect(mockCarousel).toHaveBeenCalled();
  });
  it("shows an error notification on failure to render the quiz", () => {
    const { getByText } = render(<Quiz quizData={mockQuizData} error={mockError.message} />);
    expect(getByText(mockError.message)).toBeVisible();
  });
});
