import React, { useContext } from 'react'
import { QuizContext } from '../context/quiz'
//provider é aonde provem o contexto e Context é aonde eu consumo

//import IMG SVG
import Quiz from "../img/quiz.svg"

//statics
import "./Welcome.css"

const Welcome = () => {

const [quizState, dispatch] = useContext(QuizContext)

   

  return (
    <div id='welcome'>
        <h2>Seja Bem-vindo</h2>
        <p>Clique no Botão abaixo para começar:</p>
        <button onClick={() => dispatch({type:"CHANGE_STATE"}) }>Iniciar</button>
        <img src={Quiz} alt="Início do Quiz" />
    </div>
  )
}

export default Welcome