import React from 'react';
import styled from 'styled-components'

function Gallery({gallery}) {
  return (
    <GalleryContainer>
    {gallery.map((imgSrc, idx) => 
      <GalleryImage key={idx} src={imgSrc} />
    )}
  </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
  margin-top: 2em;
`

const GalleryImage = styled.img`
  margin:30px;
  width:400px;
  height:400px;
`

export default Gallery;
