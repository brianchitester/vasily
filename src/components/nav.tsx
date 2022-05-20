import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


function Nav() {
  return (
      <StyledNav>
        <div>The Corporation Plaza Gallery
        <Subtitle>Art for business - <a href=''>connect</a></Subtitle>
        </div>
        
        <Flexatron>
            <Link to="/">Canvas</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/manifesto">Manifesto</Link>
        </Flexatron>
      </StyledNav>
  );
}

const StyledNav = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin: 1em;
    flex-wrap: wrap;
    font-family: 'Josefin Sans', cursive;
    font-size: 2em;
`

const Subtitle = styled.div`
    font-size: 0.75em;
    align-self: center;
`

const Flexatron = styled.div`
    display: flex;
    justify-content: flex-start;
    align-self: stretch;
    gap: 30px;
`

export default Nav;
