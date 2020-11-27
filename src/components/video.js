import React from "react"

const Video = ({ src, style }) => {
  return (
    <video autoPlay muted loop style={style} playsInline>
      <source src={src} type="video/mp4" />
    </video>
  )
}
export default Video
