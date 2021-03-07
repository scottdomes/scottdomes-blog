import React, { useState } from "react"
import styles from "./styles/WolframPattern.module.css"
import Pattern from "./Pattern"
import Grid, { Column, Cell } from "../Grid"
import { BINARY_RULES } from "./constants"

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
      className={`${styles.greyButton} ${styles.button} ${styles.binaryButton}`}
      onClick={() => onClick(rule)}
    >
      {binaryRules[rule] ? 1 : 0}
    </button>
  )
}

const GridColumn = ({ rule, binaryRules, updateBinaryRules }) => {
  return (
    <Column>
      <Cell>{rule}</Cell>
      <Cell>
        <YesNoButton
          rule={rule}
          binaryRules={binaryRules}
          onClick={updateBinaryRules}
        />
      </Cell>
    </Column>
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
        <Grid>
          {BINARY_RULES.map(rule => {
            return (
              <GridColumn
                rule={rule}
                key={rule}
                updateBinaryRules={updateBinaryRules}
                binaryRules={binaryRules}
              />
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Binary
