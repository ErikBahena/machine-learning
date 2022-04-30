import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <header>
        <p>Machine Learning with Ml5!</p>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/image-classification">Image Classification</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Home
