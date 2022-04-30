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

  const classifyImage = async () => {
    const res = await mobileNet.classify(imageEl.current, 5)

    console.log(res, "HERE")
    setPredictions(res)
  }

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>Image classification using MobileNet from Ml5</h1>

      <img
        src="images/king-penguin.jpeg"
        ref={imageEl}
        crossOrigin="anonymous"
      />

      <button onClick={() => classifyImage()}>Classify</button>

      {/* <label htmlFor="image-to-classify">Choose an Image:</label> */}
      {/* <input
        type="file"
        id="image-to-classify"
        name="image-to-classify"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          imageEl.current.src = URL.createObjectURL(e.target.files[0])

          classifyImage()
        }}
      /> */}

      {predictions.length &&
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
