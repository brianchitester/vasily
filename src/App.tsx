import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Canvas from './components/canvas';
import Gallery from './components/gallery';
import Manifesto from './components/manifesto';
import Nav from './components/nav';
import { mockGalleryItems } from './mock/mockGalleryItems';
import styled from 'styled-components'


function App() {
  const [gallery, setGallery] = useState<string[]>(mockGalleryItems)

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Canvas gallery={gallery} setGallery={setGallery} />} />
          <Route path="/gallery" element={<Gallery gallery={gallery} />} />
          <Route path="/manifesto" element={<Manifesto />} />
        </Routes>
        <StyledAudioControls src="art.mp3" autoPlay />
      </BrowserRouter>
    </div>
  );
}

const StyledAudioControls = styled.audio`
  position: fixed;
  bottom: 1px;
  right: 5px;
`

export default App;
