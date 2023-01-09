/* eslint-disable jest/no-mocks-import */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import QuizQuestion from "../src/components/QuizQuestion";
import { generateFakeQuiz } from "../__mocks__/quizMock";

const mockNext = jest.fn();
const mockPrev = jest.fn();

const mockQuestion = generateFakeQuiz().questions[0];

describe("QuizQuestion", () => {
  it("render the question and options", () => {
    const { getByText } = render(
      <QuizQuestion
        item={mockQuestion}
        next={mockNext}
        prev={mockPrev}
        selectedAnswers={{}}
      />
    );
    const { question } = mockQuestion;
    expect(getByText(question)).toBeVisible();
  });
  it("calls the prev function when the respective option is clicked", () => {
    const { getByText } = render(
      <QuizQuestion
        item={mockQuestion}
        next={mockNext}
        prev={mockPrev}
        selectedAnswers={{}}
      />
    );

    const prevBtn = getByText("Prev question");

    fireEvent.click(prevBtn);
    expect(mockPrev).toHaveBeenCalled();
  });

  it("calls the next function only after selecting an option and clicking the next button", () => {
    const { getByText } = render(
      <QuizQuestion
        item={mockQuestion}
        next={mockNext}
        prev={mockPrev}
        selectedAnswers={{}}
      />
    );

    const { choices } = mockQuestion;
    const nextBtn = getByText("Next question");
    const selectedOption = getByText(choices[1]);

    expect(nextBtn).toHaveAttribute("disabled");

    fireEvent.click(selectedOption);
    fireEvent.click(nextBtn);

    expect(mockNext).toHaveBeenCalled();
  });
});
