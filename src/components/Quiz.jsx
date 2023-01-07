import { instanceOf } from "prop-types";
import React, { useState } from "react";
import Carousel from "./Carousel";
import QuizQuestion from "./QuizQuestion";

const BASE_URL = "https://6ae09492-3444-4d49-9e93-21be9e6b4759.mock.pstmn.io";

function Quiz({ quizData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { quizId } = quizData;

  const postAnswers = async ({ result }) => {
    console.log(result);
    const res = await fetch(`${BASE_URL}/user/quiz/${quizId}/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify(result)
    });
    if (res?.ok) {
      console.log("success");
    }
  };

  const { questions } = quizData;
  const onNextStep = (selected) => {
    setCurrentIndex(currentIndex + 1);
    setAnswers(selected);
  };

  const onComplete = (selected) => {
    setAnswers(selected);
    const result = Object.keys(selected).map((key) => ({
      questionId: key,
      answers: [selected[key]]
    }));
    postAnswers({ result });
  };

  const onPrevStep = () => setCurrentIndex(currentIndex - 1);
  const steps = questions.map((it, index) => (
    <QuizQuestion
      item={it}
      next={index !== questions.length - 1 ? onNextStep : onComplete}
      prev={index !== 0 && onPrevStep}
      isLastQuestion={index === questions.length - 1}
      selectedAnswers={answers}
    />
  ));
  return (
    <Carousel steps={steps} currentindex={currentIndex} />
  );
}

Quiz.propTypes = {
  quizData: instanceOf(Object).isRequired
};

export default Quiz;
