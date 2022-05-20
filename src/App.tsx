import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Canvas from './components/canvas';
import Gallery from './components/gallery';
import Manifesto from './components/manifesto';
import Nav from './components/nav';
import { mockGalleryItems } from './mock/mockGalleryItems';

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
      </BrowserRouter>
    </div>
  );
}

export default App;
