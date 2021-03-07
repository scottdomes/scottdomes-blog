import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"
import Pattern from "./Pattern"

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
    <button
      className={`${styles.greyButton} ${styles.button}`}
      onClick={() => onClick(rule)}
    >
      {binaryRules[rule] ? 1 : 0}
    </button>
  )
}

const Binary = () => {
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

  const updateBinaryRules = rule => {
    const previousValue = binaryRules[rule]
    const newValue = previousValue ? 0 : 1
    setBinaryRules({ ...binaryRules, [rule]: newValue })
  }

  return (
    <div className={styles.container}>
      <Pattern
        updateRow={(row, previousRow) =>
          updateRow(row, previousRow, binaryRules)
        }
      />
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

export default Binary
