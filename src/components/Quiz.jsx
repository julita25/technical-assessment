/* eslint-disable no-unneeded-ternary */
import { instanceOf, string } from "prop-types";
import React, { useState } from "react";
import { Button, Notification } from "rsuite";
import { ACCESS_TOKEN, BASE_URL } from "../constants/apiConstants";
import Carousel from "./Carousel";
import QuizQuestion from "./QuizQuestion";

const Quiz = ({ quizData, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState();

  const postAnswers = async ({ result, token, id }) => {
    const quizId = id ? id : quizData.quizId;
    const res = await fetch(`${BASE_URL}/user/quiz/${quizId}/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(result)
    });
    if (res?.ok) {
      setSuccess(true);
    } else {
      setSubmitError(new Error("Quiz already taken"));
    }
  };


  const onNextStep = (selected) => {
    setCurrentIndex(currentIndex + 1);
    setAnswers(selected);
  };

  const onComplete = (selected, quizId) => {
    setAnswers(selected);
    const result = Object.keys(selected).map((key) => ({
      questionId: key,
      answers: [selected[key]]
    }));
    postAnswers({ result, token: ACCESS_TOKEN, id: quizId });
  };

  const onPrevStep = () => setCurrentIndex(currentIndex - 1);

  const { questions } = quizData;

  const steps = questions?.map((it, index) => (
    <QuizQuestion
      item={it}
      next={index !== questions.length - 1 ? onNextStep : onComplete}
      prev={index !== 0 && onPrevStep}
      isLastQuestion={index === questions.length - 1}
      selectedAnswers={answers}
    />
  ));

  if (error || submitError) {
    return (
      <div className="w-1/3 space-y-20 flex flex-col">
        <Notification
          closable
          type="error"
          header="error"
          className="absolute top-3 right-3 w-2/4"
        >
          {error || submitError.message}
        </Notification>
        <Button
          className="bg-blue-600 w-max"
          color="blue"
          appearance="primary"
        >
          <a href="/" rel="noreferrer" className="hover:text-white">
            Return to main page
          </a>
        </Button>
      </div>
    );
  }

  return (
    <>
      {success && (
        <Notification
          closable
          type="success"
          header="success"
          onClose={() => setSuccess(false)}
          className="absolute top-3 right-3 w-2/4"
        >
          Answers sent!
        </Notification>
      )}
      <Carousel steps={steps} currentIndex={currentIndex} />
    </>
  );
}

Quiz.propTypes = {
  quizData: instanceOf(Object),
  error: string
};

Quiz.defaultProps = {
  quizData: null,
  error: null
};

export default Quiz;
