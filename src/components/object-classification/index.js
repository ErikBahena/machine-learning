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

export default function ObjectClassification() {
  const imageEl = useRef()
  const canvasEl = useRef()

  const [detector, setDetector] = useState(null)

  useEffect(() => {
    const initializeModel = async () => {
      const detector = await ml5.objectDetector("cocossd")

      setDetector(detector)
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
    const res = await detector.detect(image)

    if (!res) console.error("couldn't detect the object")

    const canvas = canvasEl.current
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = imageEl.current
    ctx.drawImage(img, 0, 0, img.width, img.height)

    res.forEach((detection) => {
      ctx.beginPath()
      ctx.rect(detection.x, detection.y, detection.height, detection.width)
      ctx.lineWidth = 4
      ctx.strokeStyle = "#39FF14"
      ctx.stroke()

      ctx.font = "18px"
      ctx.fillStyle = "red"
      ctx.fillText(detection.label, detection.x + 10, detection.y + 15)
      ctx.fillText(
        (detection.confidence * 100).toFixed() + "%",
        detection.x + 10,
        detection.y + 25
      )
    })
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
        Object classification using the Cocossd model from Ml5
      </Typography>
      <Divider style={{ marginBottom: "2%" }} />

      <Grid container spacing={5}>
        <Grid item sx={6}>
          <Card>
            <canvas ref={canvasEl} style={{ minHeight: "300px" }}>
              <CardMedia
                component="img"
                image={null}
                ref={imageEl}
                style={{
                  display: "none",
                }}
                onLoad={(e) => {
                  e.target.style.display = "initial"
                }}
                alt="Classified Image"
              />
            </canvas>

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
      </Grid>
    </>
  )
}
