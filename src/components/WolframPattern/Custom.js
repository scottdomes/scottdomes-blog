import React, { useState } from "react"
import safeEval from "safe-eval"

import styles from "./styles/WolframPattern.module.css"
import Pattern from "./Pattern"

const updateRow = (row, previousRow, rule) => {
  return row.map((cell, i) => {
    const leftNeighbor = previousRow[i - 1] || 0
    const rightNeighbor = previousRow[i + 1] || 0
    const previousCell = previousRow[i]
    return rule(previousCell, leftNeighbor, rightNeighbor) ? 1 : 0
  })
}

const Custom = ({ hideButtons }) => {
  const [customRule, setCustomRule] = useState([])

  const customRuleEval = (previousCell, leftNeighbor, rightNeighbor) => {
    return safeEval(customRule.join(" "))
  }

  const addToRule = character => {
    const newRule = [...customRule, character]
    setCustomRule(newRule)
  }

  const deleteFromRule = () => {
    const newRule = [...customRule]
    newRule.pop()
    setCustomRule(newRule)
  }

  const clearCustomRule = () => {
    setCustomRule([])
  }

  return (
    <div className={styles.container}>
      <Pattern
        hideButtons={hideButtons}
        updateRow={(row, previousRow) =>
          updateRow(row, previousRow, customRuleEval)
        }
      />
      <div>
        <p className={styles.rule}>Rule: {customRule.join(" ")}</p>
        <div>
          <button className={styles.button} onClick={() => addToRule("(")}>
            (
          </button>
          <button className={styles.button} onClick={() => addToRule(")")}>
            )
          </button>
          <button className={styles.button} onClick={() => addToRule("&&")}>
            AND
          </button>
          <button className={styles.button} onClick={() => addToRule("||")}>
            OR
          </button>
          <button className={styles.button} onClick={() => addToRule("===")}>
            EQUALS
          </button>
          <button className={styles.button} onClick={() => addToRule("!==")}>
            DOES NOT EQUAL
          </button>
          <button className={styles.button} onClick={() => addToRule("!")}>
            NOT
          </button>
          <button
            className={styles.button}
            onClick={() => addToRule("leftNeighbor")}
          >
            left neighbor
          </button>
          <button
            className={styles.button}
            onClick={() => addToRule("rightNeighbor")}
          >
            right neighbor
          </button>
          <button
            className={styles.button}
            onClick={() => addToRule("previousCell")}
          >
            previous cell
          </button>
          <button className={styles.button} onClick={() => addToRule("=== 1")}>
            IS FILLED
          </button>
          <button className={styles.button} onClick={() => addToRule("=== 0")}>
            IS NOT FILLED
          </button>
          <button className={styles.button} onClick={deleteFromRule}>
            Delete
          </button>
          <button className={styles.button} onClick={clearCustomRule}>
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default Custom
