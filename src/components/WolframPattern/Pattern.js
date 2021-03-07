import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"
import { getFirstRow, getInitialRows } from "./util"
import WolframCanvas from "./WolframCanvas"

const Pattern = ({ updateRow, hideButtons }) => {
  const initialRows = getInitialRows()
  initialRows[0] = getFirstRow()
  const [rows, setRows] = useState(initialRows)
  const [error, setError] = useState("")

  const getUpdatedRows = () => {
    const newRows = [...rows]
    for (let i = 1; i < rows.length; i++) {
      newRows[i] = updateRow(newRows[i], newRows[i - 1])
    }
    return newRows
  }

  const testRule = () => {
    try {
      updateRow(rows[1], rows[0])
      return true
    } catch (e) {
      return false
    }
  }

  const updateRows = () => {
    setError("")
    const isWorking = testRule()
    console.log("Works?", isWorking)

    if (!isWorking) {
      return setError("Unable to process rule")
    }
    const rowsToUpdate = getUpdatedRows()

    setRows(rowsToUpdate)
  }

  const resetRows = () => {
    setError("")
    setRows(initialRows)
  }

  return (
    <div>
      <div className={styles.rowContainer}>
        {rows.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={rowIndex}>
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
          <button
            className={`${styles.greenButton} ${styles.button}`}
            onClick={updateRows}
          >
            Run
          </button>
          <button
            className={`${styles.greyButton} ${styles.button}`}
            onClick={resetRows}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default Pattern
