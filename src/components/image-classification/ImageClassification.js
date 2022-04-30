import { Link } from "react-router-dom"

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

  function handleEvent(event) {
    if (event.type === "load") {
      imageEl.current.src = reader.result

      classifyImage(imageEl.current)
    }
  }

  function addListeners(reader) {
    reader.addEventListener("load", handleEvent)
  }

  function handleSelected(e) {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      addListeners(reader)
      reader.readAsDataURL(selectedFile)
    }
  }

  const classifyImage = async (image) => {
    const res = await mobileNet.classify(image, 4)

    setPredictions(res)
  }

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>Image classification using MobileNet from Ml5</h1>

      <img src={null} ref={imageEl} alt="" />

      <label htmlFor="image-to-classify">Choose an Image:</label>
      <input
        type="file"
        id="image-to-classify"
        accept="image/*"
        onChange={handleSelected}
      />

      {predictions.length > 0 &&
        predictions.map((prediction, i) => {
          return (
            <p key={i}>
              <b>Name:</b> {prediction.label}
              <br />
              <b>Certainty:</b> {(prediction.confidence * 100).toFixed(2)}%
            </p>
          )
        })}
    </div>
  )
}
