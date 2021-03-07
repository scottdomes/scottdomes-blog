import React from "react"
import Grid, { Column, Cell } from "../Grid"
import { BINARY_RULES } from "./constants"
import styles from "./styles/RuleDisplay.module.css"

const RuleDisplay = ({ rule }) => {
  return (
    <div className={styles.container}>
      <Grid>
        {BINARY_RULES.map((combination, i) => {
          return (
            <Column>
              <Cell>{combination}</Cell>
              {rule && <Cell>{rule[i]}</Cell>}
            </Column>
          )
        })}
      </Grid>
    </div>
  )
}

export default RuleDisplay
