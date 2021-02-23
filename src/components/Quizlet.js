import React, { useState } from "react"
import styles from "./styles/Quizlet.module.css"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const trackAnswerEvent = (label, isCorrect) => {
  trackCustomEvent({
    // string - required - The object that was interacted with (e.g.video)
    category: "Form",
    // string - required - Type of interaction (e.g. 'play')
    action: "Submit",
    // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
    label,
    // number - optional - Numeric value associated with the event. (e.g. A product ID)
    value: isCorrect ? 1 : 0,
  })
}

const Banner = ({ isCorrect, hasAnswered }) => {
  if (!hasAnswered) {
    return null
  }

  if (isCorrect) {
    return (
      <div className={`${styles.banner} ${styles.correctBanner}`}>
        <p className={styles.bannerText}>Correct! 🎉</p>
      </div>
    )
  }

  return (
    <div className={`${styles.banner} ${styles.incorrectBanner}`}>
      <p className={styles.bannerText}>Try again!</p>
    </div>
  )
}

const Quizlet = ({ answers, id, indexOfCorrectAnswer, question }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    setIsCorrect(selectedAnswerIndex === indexOfCorrectAnswer)
    setHasAnswered(true)
    trackAnswerEvent(selectedAnswerIndex === indexOfCorrectAnswer, question)
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
