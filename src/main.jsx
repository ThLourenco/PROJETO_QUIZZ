import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { QuizProvider } from "../context/quiz.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* “Tudo que estiver dentro de QuizProvider (App e todos os filhos dele) vai ter acesso ao estado global do quiz.” */}
    {/* estou dizend oque todos componentes podem usar: useContext(QuizContext) */}
    <QuizProvider><App/></QuizProvider>
  </StrictMode>,
);
