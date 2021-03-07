import React, { useRef, useEffect } from "react"

const CANVAS_SIZE = 400

const drawBox = (context, numberOfCells, cellSize) => {
  context.beginPath()
  context.fillStyle = "white"
  context.lineWidth = 3
  context.strokeStyle = "black"
  for (var row = 0; row < numberOfCells; row++) {
    for (var column = 0; column < numberOfCells; column++) {
      var x = column * cellSize
      var y = row * cellSize
      context.rect(x, y, cellSize, cellSize)
      context.fill()
      context.stroke()
    }
  }
  context.closePath()
}

const WolframCanvas = ({}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const cellSize = 4
    const numberOfCells = Math.floor(CANVAS_SIZE / cellSize)
    drawBox(context, numberOfCells, cellSize)
  }, [])
  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    />
  )
}

export default WolframCanvas
