export const getEmptyRow = () => {
  return Array(101)
    .fill()
    .map(() => 0)
}

export const getFirstRow = () =>
  Array(50)
    .fill()
    .map(() => 0)
    .concat([1])
    .concat(
      Array(50)
        .fill()
        .map(() => 0)
    )
    
export const getInitialRows = () =>
  Array(50)
    .fill()
    .map(() => getEmptyRow())
