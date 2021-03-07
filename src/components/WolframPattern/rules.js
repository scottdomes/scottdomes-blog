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

export default RULES
