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
import ml5 from "ml5"

export default function VideoClassification() {
  const videoEl = useRef(null)

  const [mobileNet, setMobileNet] = useState(null)
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    let video = videoEl.current

    const initializeModel = async () => {
      const classifier = await ml5.imageClassifier("MobileNet", video)
      setMobileNet(classifier)
    }

    const initializeVideoStream = async () => {
      if (!navigator.mediaDevices.getUserMedia)
        return console.error("No Webcam detected")

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })

      if (!stream) return console.error(stream)

      video.srcObject = stream
    }

    ;(async () => {
      await initializeModel()
      await initializeVideoStream()
    })()
  }, [])

  useEffect(() => {
    if (!mobileNet) return

    setInterval(() => {
      mobileNet
        .classify()
        .then((res) => {
          setPredictions(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }, 1000)
  }, [mobileNet])

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
            <CardMedia
              component="video"
              autoPlay
              ref={videoEl}
              alt="Your webcam"
            />
          </Card>
        </Grid>

        <Grid item xs={6}>
          {videoEl.current && (
            <Typography variant="h5" style={{ marginBottom: "15px" }}>
              Predictions
            </Typography>
          )}

          {predictions.length > 0 &&
            videoEl.current &&
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
