import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"

const NUMBER_OF_ROWS = 50
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
    console.log(leftNeighbor, rightNeighbor, previousCell)
    return rule(previousCell, leftNeighbor, rightNeighbor) ? 1 : 0
  })
}

const WolframPattern = () => {
  initialRows[0] = firstRow
  const [rows, setRows] = useState(initialRows)

  const rule = (cell, leftNeighbor, rightNeighbor) => {
    return (
      (leftNeighbor === 1 || rightNeighbor === 1) &&
      leftNeighbor !== rightNeighbor
    )
  }

  const updateRows = () => {
    const newRows = [...rows]
    for (let i = 1; i < rows.length; i++) {
      newRows[i] = updateRow(newRows[i], newRows[i - 1], rule)
    }
    setRows(newRows)
  }

  const resetRows = () => {
    setRows(initialRows)
  }

  return (
    <div>
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
      <button onClick={updateRows}>Run</button>
      <button onClick={resetRows}>Reset</button>
    </div>
  )
}

export default WolframPattern
