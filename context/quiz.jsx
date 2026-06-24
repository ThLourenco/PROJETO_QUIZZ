import { Children, createContext, useReducer } from "react";
import questions from "../data/questions_complete";
import Question from "../components/Question";

const STAGES = ["Start", "Category", "Playing", "End"];

const initialStage = {
  //definindo valores iniciais do jogo
  gameStage: STAGES[0], // tela inicial
  questions, //pergunta importadas
  currentQuestion: 0, //primeira pergunta
  score: 0, //pontuaçao
  answerSelected: false, // nenhuma resposta escolhida
  help: false, // nenhuma ajuda ativa
  optionToHide: null, //nenhuma opçao escolhida
};

//stado = estado inicial , action = açao enviada pelo dispatch
const quizReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        gameStage: STAGES[1],
      };

    case "START_GAME":
      let quizQuestions = null;
      state.questions.forEach((question) => {
        if (question.category === action.payload) {
          quizQuestions = question.questions;
        }
      });

      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        questions: quizQuestions,
        gameStage: STAGES[2],
      };

    case "REORDER_QUESTIONS":
      console.log("entrou no reducer");
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });
      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        questions: reorderedQuestions,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;
      if (!state.questions[nextQuestion]) {
        endGame = true;
      }
      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
        help: false,
      };

    case "NEW_GAME":
      return initialStage;

    case "CHECK_ANSWER":
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) correctAnswer = 1;

      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        score: state.score + correctAnswer,
        answerSelected: option,
      };

    case "SHOW_TIP":
      return {
        ...state,
        help: "tip",
      };

    case "REMOVE_OPTION":
      const questionWithOutOption = state.questions[state.currentQuestion];

      let repeat = true;
      let optionToHide;

      questionWithOutOption.options.forEach((option) => {
        if (option !== questionWithOutOption.answer && repeat) {
          optionToHide = option;
          repeat = false;
        }
      });

      return {
        ...state, //estou pegando a propriedade original do objeto, e depois alterando
        optionToHide,
        help: true,
      };

    default:
      return state;
  }
};

//Criando context "caixa glboal" onde poderá guarda dados para varios componentes acessarem sem precisar passar props
export const QuizContext = createContext();

//children componentes dentro de componentes
/*
  QuizProvider = componente que envolve o app inteiro
  Ele serve para "distribuir" estado global (quiz) para todos os filhos
*/
export const QuizProvider = ({ children }) => {
  /*
    useReducer cria 2 coisas:

    1. state  → os dados atuais do quiz
    2. dispatch → função que muda esses dados

    quizReducer → regras de como o estado muda
    initialStage → estado inicial do quiz
  */
  const value = useReducer(quizReducer, initialStage);
  // QuizContext.Provider - Ele pega um valor e “distribui” para todos os componentes dentro dele.
  // value={value} "esse é o dado que eu quero compartilhar globalmente"
  //no caso const value = useReducer(quizReducer, initialStage);
  //O que é {children}? children significa: tudo que está dentro do Provider
  /* 
  <QuizProvider>
  <App />
  </QuizProvider>
  */
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
  //“Pegue o valor do quiz (state + dispatch) e disponibilize para todos os componentes dentro do App.”
  
  /* Cria uma caixa global chamada QuizContext
  e coloca dentro dela o estado do quiz (value)
  Depois envolve o App inteiro nessa caixa,
  para que qualquer componente possa acessar esse estado.
  */
};
