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

export default function ImageClassification() {
  const imageEl = useRef()

  const [mobileNet, setMobileNet] = useState(null)

  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    const initializeModel = async () => {
      const classifier = await ml5.imageClassifier("MobileNet")

      setMobileNet(classifier)
    }

    initializeModel()
  }, [])

  const reader = new FileReader()

  const handleEvent = (event) => {
    if (event.type === "load") {
      imageEl.current.src = reader.result

      classifyImage(imageEl.current)
    }
  }

  const handleSelected = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      reader.addEventListener("load", handleEvent)
      reader.readAsDataURL(selectedFile)
    }
  }

  const classifyImage = async (image) => {
    const res = await mobileNet.classify(image, 4)

    setPredictions(res)
  }

  return (
    <>
      <Typography
        variant="h4"
        style={{
          margin: "15px 0px",
          "@media (maxWidth: 400px)": {
            textAlign: "center",
          },
        }}
      >
        Image classification using MobileNet from Ml5
      </Typography>
      <Divider style={{ marginBottom: "2%" }} />

      <Grid container spacing={5}>
        <Grid item>
          <Card style={{ maxWidth: "max-content" }}>
            <CardMedia
              component="img"
              image={null}
              ref={imageEl}
              style={{ height: "auto", maxWidth: "500px", display: "none" }}
              onLoad={(e) => {
                e.target.style.display = "initial"
              }}
              alt="Classified Image"
            />

            <Divider />
            <CardActions>
              <Button
                color="primary"
                fullWidth
                variant="text"
                component="label"
                aria-label="upload picture"
              >
                Upload Image
                <Input
                  onChange={handleSelected}
                  type="file"
                  style={{ display: "none" }}
                  inputProps={{ hidden: true, accept: "image/png, image/jpeg" }}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item>
          {imageEl?.current?.src && (
            <Typography variant="h5" style={{ marginBottom: "15px" }}>
              Predictions
            </Typography>
          )}

          {predictions.length > 0 &&
            imageEl.current.src &&
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
