import { Children, createContext, useReducer } from "react";
import question from '../data/questions'


const STAGES = ["Start","Playing","End"]

const initialStage = {
    gameStage: STAGES[0],
    question
}

const quizReducer = (state, action) => {

    switch(action.type){
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            };

            default:
                return state;
    }

}

export const QuizContext = createContext()
            //children componentes dentro de componentes
export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, initialStage);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}