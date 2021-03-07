import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"
import { RULES } from "./rules"
import { getFirstRow, getInitialRows } from "./util"

const updateRow = (row, previousRow, rule) => {
  return row.map((cell, i) => {
    const leftNeighbor = previousRow[i - 1] || 0
    const rightNeighbor = previousRow[i + 1] || 0
    const previousCell = previousRow[i]
    return rule(previousCell, leftNeighbor, rightNeighbor) ? 1 : 0
  })
}

const WolframPattern = ({ defaultRule, hideButtons }) => {
  const initialRows = getInitialRows()
  initialRows[0] = getFirstRow()
  const [rows, setRows] = useState(initialRows)

  const getUpdatedRows = () => {
    const newRows = [...rows]
    for (let i = 1; i < rows.length; i++) {
      newRows[i] = updateRow(newRows[i], newRows[i - 1], RULES[defaultRule])
    }
    return newRows
  }

  const updateRows = () => {
    const rowsToUpdate = getUpdatedRows()

    setRows(rowsToUpdate)
  }

  const resetRows = () => {
    setRows(initialRows)
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
    </div>
  )
}

export default WolframPattern
