import React from 'react'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Category from "../img/Category.svg"

import "./PickCategory.css"

const PickCategory = () => {
  return (
    <div id='category'>
        <h2>Escolha a categoria</h2>
        <p>As Perguntas serãoreferentes a uma das linguages abaixo:</p>
        <div>
            <button>css</button>
        </div>
        <img src={Category} alt="Categoria do quiz" />
    </div>
  )
}

export default PickCategory