import React from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { AppBar, Tabs, Tab, Container } from "@material-ui/core"

import AppBarMain from "./AppBar"

import DefaultExample from "../home"
import ImageClassification from "../image-classification"
import VideoClassification from "../video-classification"
import ObjectClassification from "../object-classification"

export const previewNavTabsId = "preview-nav-tabs"

const Navigation = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const navigate = useNavigate()

  const handleChange = (_, newPath) => {
    setCurrentPath(newPath)
    navigate(newPath)
  }

  const handleOpenDrawer = () => setDrawerOpen(true)
  // const handleCloseDrawer = () => setDrawerOpen(false)

  return (
    <>
      <AppBarMain onDrawerButtonClick={handleOpenDrawer} />
      <AppBar position="static" id={previewNavTabsId}>
        <Tabs
          value={currentPath}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="page tabs"
        >
          <Tab label="Home" value="/" />
          <Tab label="Image Classification" value="/image-classification" />
          <Tab label="Video Classification" value="/video-classification" />
          <Tab label="Object Classification" value="/object-classification" />
        </Tabs>
      </AppBar>

      <Container>
        <Routes>
          <Route
            path="/image-classification"
            element={<ImageClassification />}
          />
          <Route
            path="/video-classification"
            element={<VideoClassification />}
          />
          <Route
            path="/object-classification"
            element={<ObjectClassification />}
          />
          <Route path="/" element={<DefaultExample />} />
        </Routes>
      </Container>
    </>
  )
}

export default Navigation
