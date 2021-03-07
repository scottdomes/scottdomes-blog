import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"

const RULES = {
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

const updateRow = (row, previousRow, binaryRules) => {
  return row.map((cell, i) => {
    const leftNeighbor = previousRow[i - 1] || 0
    const rightNeighbor = previousRow[i + 1] || 0
    const previousCell = previousRow[i]
    const string = `${leftNeighbor}${previousCell}${rightNeighbor}`
    return binaryRules[string] ? 1 : 0
  })
}

const YesNoButton = ({ rule, onClick, binaryRules }) => {
  return (
    <button className={styles.button} onClick={() => onClick(rule)}>
      {binaryRules[rule] ? 1 : 0}
    </button>
  )
}

const WolframPattern = ({ defaultRule, isBinary }) => {
  initialRows[0] = firstRow
  const [rows, setRows] = useState(initialRows)
  const [error, setError] = useState("")
  const [binaryRules, setBinaryRules] = useState({
    "111": false,
    "110": false,
    "101": false,
    "100": false,
    "011": false,
    "010": false,
    "001": false,
    "000": false,
  })

  const getUpdatedRows = () => {
    const newRows = [...rows]
    for (let i = 1; i < rows.length; i++) {
      newRows[i] = updateRow(newRows[i], newRows[i - 1], binaryRules)
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

  const updateBinaryRules = rule => {
    const previousValue = binaryRules[rule]
    const newValue = previousValue ? 0 : 1
    setBinaryRules({ ...binaryRules, [rule]: newValue })
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
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={updateRows}>
          Run
        </button>
        <button className={styles.button} onClick={resetRows}>
          Reset
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>111</td>
              <td>110</td>
              <td>101</td>
              <td>100</td>
              <td>011</td>
              <td>010</td>
              <td>001</td>
              <td>000</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <YesNoButton
                  rule="111"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="110"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="101"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="100"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="011"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="010"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="001"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
              <td>
                <YesNoButton
                  rule="000"
                  binaryRules={binaryRules}
                  onClick={updateBinaryRules}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WolframPattern
