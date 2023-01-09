/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render } from "@testing-library/react";
import Carousel from "../src/components/Carousel";
import QuizQuestion from "../src/components/QuizQuestion";
import { generateFakeQuiz } from "../__mocks__/quizMock";

const mockNext = jest.fn();
const mockPrev = jest.fn();
const mockCurrentIndex = 1;
const question1 = generateFakeQuiz().questions[0];
const question2 = generateFakeQuiz().questions[1];

const mockSteps = [
  <QuizQuestion
    item={question1}
    next={mockNext}
    prev={mockPrev}
    selectedAnswers={{}}
  />,
  <QuizQuestion
    item={question2}
    next={mockNext}
    prev={mockPrev}
    selectedAnswers={{}}
  />
];

describe("TestSteps", () => {
  it("renders the right quiz question, depending on the current index given", () => {
    const { getByText } = render(<Carousel steps={mockSteps} currentIndex={mockCurrentIndex} />);
    const { choices } = question2;
    Object.values(choices).forEach((option) => {
      expect(getByText(option)).toBeVisible();
    });
  });
});
