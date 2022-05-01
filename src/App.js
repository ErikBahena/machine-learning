import React from "react"
import Layout from "./components/layout/Layout"

import { BrowserRouter as Router } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}
