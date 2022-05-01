import {
  Typography,
  Card,
  CardMedia,
  Divider,
  CardActions,
  Button,
  Input,
  Grid,
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

      return setMobileNet(classifier)
    }

    const initializeVideoStream = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        if (!stream) return console.error(stream)

        video.srcObject = stream

        if (stream.active) return classifyVideo()
      }
    }

    ;(async () => {
      await initializeModel()
      await initializeVideoStream()
    })()
  }, [])

  const classifyVideo = async () => {
    const res = await mobileNet.classify(videoEl.current, 4)

    setPredictions(res)
  }

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
      <Typography
        variant="h5"
        style={{
          margin: "15px 0px",
        }}
      >
        Webcam:
      </Typography>

      <Grid container spacing={5}>
        <Grid item>
          <Card style={{ maxWidth: "max-content" }}>
            <CardMedia
              component="video"
              autoPlay
              ref={videoEl}
              style={{ height: "auto", maxWidth: "500px" }}
              alt="Your webcam"
            />

            {/* <Divider /> */}
            {/* <CardActions>
              <Button
                color="primary"
                fullWidth
                variant="text"
                component="label"
                aria-label="upload picture"
                onClick={classifyVideo}
              >
                Classify
              </Button>
            </CardActions> */}
          </Card>
        </Grid>

        <Grid item>
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
      </Grid>
    </>
  )
}
