import { Typography, Divider, Card, Grid } from "@material-ui/core"

import { useEffect, useRef } from "react"

import Webcam from "react-webcam"
import ml5 from "ml5"

export default function VideoObjectClassification() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const loadModel = async () => {
    let detectionInterval

    const detector = await ml5.objectDetector("cocossd")

    detectionInterval = setInterval(() => {
      detect(detector)
    }, 1000 / 40)

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval)
      }
    }
  }

  const detect = async detector => {
    if (
      typeof webcamRef.current === "undefined" &&
      webcamRef.current === null &&
      webcamRef.current.video.readyState !== 4
    )
      return

    // Get Video Properties
    const video = webcamRef.current.video

    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight

    // Set video height and width
    webcamRef.current.video.height = videoHeight
    webcamRef.current.video.width = videoWidth

    // Set canvas height and width
    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight

    const results = await detector.detect(video)

    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, videoWidth, videoHeight)

    results.forEach(({ x, y, width, height, label, confidence }) => {
      ctx.lineWidth = 4
      ctx.strokeStyle = "#39FF14"
      ctx.font = "50px Arial"
      ctx.fillStyle = "white"

      ctx.beginPath()
      ctx.fillText(label, x + 20, y + 40)

      const confidenceText = (confidence * 100).toFixed(2) + "%"
      ctx.fillText(confidenceText, x + 20, y + 100)

      ctx.rect(x, y, height, width)
      ctx.stroke()
    })
  }

  useEffect(() => {
    loadModel()
  }, [])

  return (
    <>
      <Typography
        variant="h4"
        style={{
          margin: "15px 0px",
        }}
      >
        Video Object classification with your webcam from Ml5.js using the
        cocossd pre-trained model
      </Typography>
      <Divider style={{ marginBottom: "2%" }} />

      <Grid container>
        <Grid item>
          <Card
            style={{
              position: "relative",
              maxWidth: "max-content",
            }}
          >
            <Webcam
              ref={webcamRef}
              muted={true}
              style={{
                position: "absolute",
                zIndex: 8,
                width: 640,
                height: 480,
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "relative",
                zIndex: 9,
                width: 640,
                height: 480,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
