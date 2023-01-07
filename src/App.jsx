import React from "react";
import { useQuery } from "react-query";
import { Button, Loader } from "rsuite";
import Quiz from "./components/Quiz";

const THEME_ID = "63a88cf1e774d167cd92c06f";
const BASE_URL = "https://6ae09492-3444-4d49-9e93-21be9e6b4759.mock.pstmn.io";

function App() {
  const fetchQuizData = async () => {
    const res = await fetch(`${BASE_URL}/user/quiz/random?themeId=${THEME_ID}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    if (res?.ok) {
      console.log("here");
      const response = await res.json();
      return response;
    }
    return {};
  };

  const { data: quizData, isLoading } = useQuery("quiz", fetchQuizData);

  if (isLoading) return <Loader />;

  return (
    <div className="p-10">
      <Button className="text-blue-500 text-xl">Click here to see your available tests</Button>
      <Quiz quizData={quizData} />
    </div>
  );
}

export default App;
