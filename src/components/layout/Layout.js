import React from "react"

import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "../../theme"
import "./layout.css"

import Navigation from "./Navigation"

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navigation />
    </ThemeProvider>
  )
}

export default Layout
