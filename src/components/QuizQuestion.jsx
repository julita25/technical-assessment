import React, { useState } from "react";
import { bool, func, instanceOf } from "prop-types";
import { Button } from "rsuite";

function QuizQuestion({
  item, prev, next, isComplete
}) {
  const { id, question, choices } = item;
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="space-y-10 flex flex-col justify-center items-center">
      <div className="w-2/3 space-y-5">
        <div className="text-2xl">{question}</div>
        {
          Object.values(choices).map((option, index) => {
            const sel = index + 1;
            return (
              <div
                key={id}
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
            // onClick={handleNext}
            disabled={!selectedOption}
            appearance="primary"
            color="blue"
            className="bg-blue-600"
          >
            Next question
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
        {Boolean(isComplete) && (
          <Button
            // onClick={handleNext}
            disabled={!selectedOption}
            appearance="primary"
            color="blue"
            className="bg-blue-600"
          >
            Submit answers
          </Button>
        )}
      </div>
    </div>
  );
}

QuizQuestion.propTypes = {
  next: func.isRequired,
  prev: bool.isRequired,
  isComplete: bool.isRequired,
  item: instanceOf(Object).isRequired
};

export default QuizQuestion;
