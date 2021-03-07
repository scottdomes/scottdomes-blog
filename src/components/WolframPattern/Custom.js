import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"

const RULES = {
  1: previousCell => previousCell,
  2: (_previousCell, leftNeighbor) => leftNeighbor,
  30: (previousCell, leftNeighbor, rightNeighbor) => {
    return (
      (leftNeighbor && !(previousCell || rightNeighbor)) ||
      (!leftNeighbor && (previousCell || rightNeighbor))
    )
  },
  90: (cell, leftNeighbor, rightNeighbor) => {
    return (
      (leftNeighbor === 1 || rightNeighbor === 1) &&
      leftNeighbor !== rightNeighbor
    )
  },
  254: (cell, leftNeighbor, rightNeighbor) => {
    return leftNeighbor === 1 || rightNeighbor === 1 || cell === 1
  },
}

const getEmptyRow = () => {
  return Array(101)
    .fill()
    .map(() => 0)
}

const firstRow = Array(50)
  .fill()
  .map(() => 0)
  .concat([1])
  .concat(
    Array(50)
      .fill()
      .map(() => 0)
  )
const initialRows = Array(50)
  .fill()
  .map(() => getEmptyRow())

const updateRow = (row, previousRow, rule) => {
  return row.map((cell, i) => {
    const leftNeighbor = previousRow[i - 1] || 0
    const rightNeighbor = previousRow[i + 1] || 0
    const previousCell = previousRow[i]
    return rule(previousCell, leftNeighbor, rightNeighbor) ? 1 : 0
  })
}

const WolframPattern = ({ defaultRule, hideButtons }) => {
  initialRows[0] = firstRow
  const [rows, setRows] = useState(initialRows)
  const [error, setError] = useState("")
  const [customRule, setCustomRule] = useState([])

  const customRuleEval = (cell, leftNeighbor, rightNeighbor) => {
    return eval(customRule.join(" "))
  }

  const getUpdatedRows = () => {
    const newRows = [...rows]
    for (let i = 1; i < rows.length; i++) {
      const rule = defaultRule ? RULES[defaultRule] : customRuleEval
      newRows[i] = updateRow(newRows[i], newRows[i - 1], rule)
    }
    return newRows
  }
  const testCustomRule = () => {
    try {
      customRuleEval(rows[0][50], rows[0][49], rows[0][51])
      return true
    } catch (e) {
      return false
    }
  }

  const updateRows = () => {
    const isWorking = testCustomRule()
    console.log("Works?", isWorking)

    if (!isWorking) {
      return setError("Unable to process rule")
    }
    const rowsToUpdate = getUpdatedRows()

    setRows(rowsToUpdate)
  }

  const resetRows = () => {
    setRows(initialRows)
  }

  const addToRule = character => {
    setError("")
    const newRule = [...customRule, character]
    setCustomRule(newRule)
  }

  const deleteFromRule = () => {
    setError("")
    const newRule = [...customRule]
    newRule.pop()
    setCustomRule(newRule)
  }

  const clearCustomRule = () => {
    setError("")
    setCustomRule([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        {rows.map((row, rowIndex) => {
          return (
            <div className={styles.row}>
              {row.map((cell, cellIndex) => {
                return (
                  <span
                    key={`${rowIndex}${cellIndex}`}
                    className={`${styles.cell} ${
                      cell === 0 ? styles.whiteCell : styles.blackCell
                    }`}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!hideButtons && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={updateRows}>
            Run
          </button>
          <button className={styles.button} onClick={resetRows}>
            Reset
          </button>
        </div>
      )}
      {!defaultRule && !hideButtons && (
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
            <button className={styles.button} onClick={() => addToRule("cell")}>
              previous cell
            </button>
            <button
              className={styles.button}
              onClick={() => addToRule("=== 1")}
            >
              IS FILLED
            </button>
            <button
              className={styles.button}
              onClick={() => addToRule("=== 0")}
            >
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
      )}
    </div>
  )
}

export default WolframPattern
