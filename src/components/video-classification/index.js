import {
  Typography,
  Card,
  CardMedia,
  Divider,
  Slider,
  Grid,
  Button,
} from "@material-ui/core"

import { useEffect, useState, useRef } from "react"

import Webcam from "react-webcam"

import ml5 from "ml5"

export default function VideoClassification() {
  const webcamRef = useRef(null)

  const [predictions, setPredictions] = useState([])

  const initializeModel = async () => {
    let detectionInterval

    const classifier = await ml5.imageClassifier(
      "MobileNet",
      webcamRef.current.video
    )

    if (
      typeof webcamRef.current === "undefined" &&
      webcamRef.current === null &&
      webcamRef.current.video.readyState !== 4
    )
      return

    detectionInterval = setInterval(async () => {
      let res = await classifier.classify()

      setPredictions(res)
    }, 1000 / 2)

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval)
      }
    }
  }

  useEffect(() => {
    initializeModel()
  }, [])

  return (
    <>
      <Typography
        variant="h4"
        style={{
          margin: "15px 0px",
        }}
      >
        Video classification with your webcam from Ml5
      </Typography>
      <Divider style={{ marginBottom: "2%" }} />

      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Card style={{ maxWidth: "max-content" }}>
            <Webcam ref={webcamRef} width="100%" />
          </Card>
        </Grid>

        <Grid item xs={6}>
          {webcamRef.current && (
            <Typography variant="h5" style={{ marginBottom: "15px" }}>
              Predictions
            </Typography>
          )}

          {predictions.length > 0 &&
            webcamRef.current &&
            predictions.map((prediction, i) => {
              return (
                <p key={i}>
                  <b>Name:</b> {prediction.label}
                  <br />
                  <b>Certainty:</b> {(prediction.confidence * 100).toFixed(2)}%
                </p>
              )
            })}
        </Grid>
        {/* <Grid item sx={6}>
          <Typography variant="h6" id="discrete-slider">
            Set The Classification Rate
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Current Rate: 1 prediction every {predictionRate}{" "}
            {predictionRate === 1 ? "second" : "seconds"}
          </Typography>

          <Slider
            defaultValue={1}
            aria-labelledby="discrete-slider"
            step={1}
            marks
            onChange={(_, newPredictionRate) =>
              setPredictionRate(newPredictionRate)
            }
            min={1}
            max={5}
          />
        </Grid> */}
      </Grid>
    </>
  )
}
