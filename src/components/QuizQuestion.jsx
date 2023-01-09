import React, { useEffect, useState } from "react";
import {
  instanceOf, func, bool, oneOfType
} from "prop-types";
import { Button } from "rsuite";
import { ERROR_QUIZ_ID } from "../constants/apiConstants";

const QuizQuestion = ({
  item, prev, next, selectedAnswers, isLastQuestion
}) => {
  const { id, question, choices } = item;
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    setSelectedOption();
  }, [item]);

  const handleNext = (quizId) => {
    const updatedAnswer = { ...selectedAnswers };
    updatedAnswer[id] = selectedOption;
    next(updatedAnswer, quizId);
  };

  return (
    <div className="space-y-10 flex flex-col justify-center items-center">
      <div className="w-2/3 space-y-5">
        <div className="text-2xl">{question}</div>
        {
          Object.values(choices).map((option, index) => {
            const sel = index + 1;
            return (
              <div
                key={sel}
                onClick={() => setSelectedOption(sel)}
                onKeyDown={() => setSelectedOption(sel)}
                role="button"
                tabIndex={0}
                className={`cursor-pointer rounded-lg border border-blue-700 p-2 hover:border-blue-400 hover:bg-blue-200 w-full ${sel === selectedOption && "bg-blue-200"}`}
              >
                {option}
              </div>
            );
          })
        }
      </div>
      <div className="flex flex-col space-y-2">
        {Boolean(next) && (
          <Button
            onClick={() => handleNext(null)}
            disabled={!selectedOption}
            appearance="primary"
            color="blue"
            className="bg-blue-600"
          >
            {isLastQuestion ? "Submit" : "Next question"}
          </Button>
        )}
        {isLastQuestion && (
          <Button
            onClick={() => handleNext(ERROR_QUIZ_ID)}
            disabled={!selectedOption}
            appearance="primary"
            color="blue"
            className="bg-blue-600"
          >
            Submit answers again
          </Button>
        )}
        {Boolean(prev) && (
          <Button
            onClick={prev}
            appearance="primary"
            className="bg-gray-400 hover:bg-gray-500"
          >
            Prev question
          </Button>
        )}
      </div>
    </div>
  );
}

QuizQuestion.propTypes = {
  next: func.isRequired,
  prev: oneOfType([bool, func]).isRequired,
  isLastQuestion: bool,
  item: instanceOf(Object).isRequired,
  selectedAnswers: instanceOf(Object).isRequired
};

QuizQuestion.defaultProps = {
  isLastQuestion: false
};

export default QuizQuestion;
