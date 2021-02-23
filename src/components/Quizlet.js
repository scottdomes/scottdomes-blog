import React, { useState } from "react"

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
    <div>
      <h4>Knowledge check</h4>
      <h5>{question}</h5>
      <form onSubmit={onSubmit}>
        {answers.map((answer, i) => {
          return (
            <div key={`${id}${i}`}>
              <input
                type="radio"
                id={`${id}${i}`}
                onChange={() => setSelectedAnswerIndex(i)}
                checked={selectedAnswerIndex === i}
              />
              <label htmlFor={`${id}${i}`}>{answer}</label>
            </div>
          )
        })}
        <button type="submit">Submit</button>
      </form>
      <Banner isCorrect={isCorrect} hasAnswered={hasAnswered} />
    </div>
  )
}

export default Quizlet
