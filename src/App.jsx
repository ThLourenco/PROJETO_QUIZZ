import Welcome from "../components/Welcome";
import "./App.css";

import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import Question from "../components/Question";
import { GameOver } from "../components/GameOver";

function App() {
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    // embaralhar as perguntas
    console.log("executatou")
    dispatch({type: "REORDER_QUESTIONS"})
  }, [])

  return (
    <div className="App">
      <h1>Quiz de Programação</h1>
      {quizState.gameStage === "Start" && <Welcome />}
      {quizState.gameStage === "Playing" && <Question />}
      {quizState.gameStage === "End" && <GameOver/>}
    </div>
  );
}

export default App;
