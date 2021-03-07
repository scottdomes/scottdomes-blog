import React from "react"
import styles from "./styles/grid.module.css"

export const Cell = ({ children }) => {
  return <span className={styles.cell}>{children}</span>
}

export const Column = ({ children }) => {
         return <div className={styles.column}>{children}</div>
       }

const Grid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>
}


export default Grid