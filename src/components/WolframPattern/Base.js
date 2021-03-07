import React from "react"
import styles from "./styles/WolframPattern.module.css"
import { RULES } from "./constants"
import Pattern from "./Pattern"

const updateRow = (row, previousRow, rule) => {
  return row.map((cell, i) => {
    const leftNeighbor = previousRow[i - 1] || 0
    const rightNeighbor = previousRow[i + 1] || 0
    const previousCell = previousRow[i]
    return rule(previousCell, leftNeighbor, rightNeighbor) ? 1 : 0
  })
}

const Base = ({ defaultRule, hideButtons }) => {
  return (
    <div className={styles.container}>
      <Pattern
        hideButtons={hideButtons}
        updateRow={(row, previousRow) =>
          updateRow(row, previousRow, RULES[defaultRule])
        }
      />
    </div>
  )
}

export default Base
