import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


function Nav() {
  return (
      <StyledNav>
        <div>The Corporation Plaza Gallery</div>
        <Subtitle>Art for business</Subtitle>
        <Link to="/">Canvas</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/manifesto">Manifesto</Link>
      </StyledNav>
  );
}

const StyledNav = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    width: 100%;
    margin: 1em;
    flex-wrap: wrap;
    font-family: 'Josefin Sans', cursive;
    font-size: 2em;
`

const Subtitle = styled.div`
    font-size: 0.5em;
    align-self: center;
    margin-right:50px;
`

export default Nav;
