
import React, { useRef, useEffect, useState } from 'react'
import chance from 'chance'
import styled from 'styled-components'

const Canvas = () => {
  
  const canvasRef = useRef(null)
  const [count, setCounter] = useState(0)
  useEffect(() => {
    if (!canvasRef.current) {
        return
    }
  
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    drawCanvas(context)
  }, [])

  const random = new chance()

  const number = () => {
    return  random.integer({min: 0, max: 500})
  }

  const createGradient = (ctx) => {
    const grd = ctx.createLinearGradient(number(), number(), number(), number());
    grd.addColorStop(0, random.color({format: 'rgb'}));
    grd.addColorStop(1, random.color({format: 'rgb'}));
    return grd
  }
  
  const drawRect = (ctx) => {
    ctx.fillStyle = createGradient(ctx);
    ctx.fillRect(number()/2, number()/2, number(), number());
  }

  const drawCircle = (ctx) => {
    ctx.fillStyle = createGradient(ctx);
    ctx.beginPath()
    ctx.arc(number(), number(), number()/2, 0, 2*Math.PI)
    ctx.fill()
  }

  const drawTriangle = (ctx) => {
    ctx.fillStyle = createGradient(ctx);
    ctx.beginPath();
    ctx.moveTo(number(), number());
    ctx.lineTo(number(), number());
    ctx.lineTo(number(), number());
    ctx.fill();
  }

  const drawCanvas = (ctx) => {
    if (!ctx) {
      return
    }
    setCounter(count+1)
    ctx.fillStyle = '#F9F8F4';
    ctx.fillRect(0,0,500,500);
  }

  const canvas = canvasRef.current
  const context = canvas?.getContext('2d')
  return <>
    <StyledCanvas ref={canvasRef} width="500" height="500"/>
    <ButtonContainer>
      <StyledButton onClick={() => drawTriangle(context)}>Draw Triangle</StyledButton>
      <StyledButton onClick={() => drawCircle(context)}>Draw Circle</StyledButton>
      <StyledButton onClick={() => drawRect(context)}>Draw Rectangle</StyledButton>
    </ButtonContainer>
  </>
}

const StyledCanvas = styled.canvas`
  border: 1px solid black;
  margin-top: 50px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
  margin-top: 2em;
`

const StyledButton = styled.button`
  display:block;
  margin: 10px;
  padding: 10px;
  align: center;
  font-size: 2em;
`

export default Canvas