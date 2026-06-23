import React from 'react'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Category from "../img/Category.svg"

import "./PickCategory.css"

const PickCategory = () => {

  const [quizState, dispatch] = useContext(QuizContext);

  const choseCategoryAndReorderQuestions = (category) => {

    dispatch({type:"START_GAME", payload: category  });

    dispatch({type: "REORDER_QUESTIONS"});

  }

  return (
    <div id='category'>
        <h2>Escolha a categoria</h2>
        <p>As Perguntas serãoreferentes a uma das linguages abaixo:</p>
        <div>
            <div>{quizState.questions.map((question) => (
              <button onClick={() => choseCategoryAndReorderQuestions(question.category) } key={question.category}>{question.category}</button>
            ))}</div>
        </div>
        <img src={Category} alt="Categoria do quiz" />
    </div>
  )
}

export default PickCategory