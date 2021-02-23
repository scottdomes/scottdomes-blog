import React, { useState } from "react"
import styles from "./styles/Quizlet.module.css"

const Banner = ({ isCorrect, hasAnswered }) => {
  if (!hasAnswered) {
    return null
  }

  if (isCorrect) {
    return <p>That's correct!</p>
  }

  return <p>That's incorrect. Try again!</p>
}

const Quizlet = ({ answers, id, indexOfCorrectAnswer, question }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    setIsCorrect(selectedAnswerIndex === indexOfCorrectAnswer)
    setHasAnswered(true)
  }
  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Knowledge check</h4>
      <h5 className={styles.question}>{question}</h5>
      <form className={styles.form} onSubmit={onSubmit}>
        {answers.map((answer, i) => {
          return (
            <div key={`${id}${i}`}>
              <input
                className={styles.input}
                type="radio"
                id={`${id}${i}`}
                onChange={() => {
                  setSelectedAnswerIndex(i)
                  setHasAnswered(false)
                }}
                checked={selectedAnswerIndex === i}
              />
              <label className={styles.label} htmlFor={`${id}${i}`}>
                {answer}
              </label>
            </div>
          )
        })}
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
      <Banner isCorrect={isCorrect} hasAnswered={hasAnswered} />
    </div>
  )
}

export default Quizlet
