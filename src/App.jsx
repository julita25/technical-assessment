/* eslint-disable no-else-return */
import React, { useState } from "react";
import { Button, Loader } from "rsuite";
import Quiz from "./components/Quiz";
import {
  ACCESS_TOKEN, BASE_URL, ERROR_THEME_ID, THEME_ID
} from "./constants/apiConstants";

const App = () => {
  const [quizData, setQuizData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchQuizData = async (token, themeId) => {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/user/quiz/random?themeId=${themeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (res?.ok) {
      const response = await res.json();
      setQuizData(response);
      setError("");
      setIsLoading(false);
    } else {
      setError(new Error("No more questions to take"));
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    fetchQuizData(ACCESS_TOKEN, THEME_ID);
  };

  const handleStartQuizWithError = () => {
    setShowQuiz(true);
    fetchQuizData(ACCESS_TOKEN, ERROR_THEME_ID);
  };

  if (isLoading) return <Loader center size="md" />;

  return (
    <div className="flex flex-col h-screen w-full justify-start items-center p-10">
      <div className="mt-16">
        {!showQuiz
          ? (
            <div className="space-y-10 flex flex-col justify-start items-center">
              <div className="text-xl text-blue-500">
                Welcome! Complete the below quiz and submit your answers!
              </div>
              <div>
                <Button
                  className="bg-green-500 w-44"
                  appearance="primary"
                  color="green"
                  onClick={handleStartQuiz}
                >
                  Start quiz
                </Button>
              </div>
              <div>
                <Button
                  className="bg-blue-600 w-44"
                  appearance="primary"
                  color="blue"
                  onClick={handleStartQuizWithError}
                >
                  Start unavailable quiz
                </Button>
              </div>
            </div>
          )
          : <Quiz quizData={quizData} error={error.message} />}
      </div>
      <div />
    </div>
  );
}

export default App;
