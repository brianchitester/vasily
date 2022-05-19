
import React, { useRef, useEffect, useState } from 'react'
import chance from 'chance'
import styled from 'styled-components'

const Canvas = () => {
  
  const canvasRef = useRef(null)
  const [count, setCounter] = useState(0)
  useEffect(() => {
    if (!canvasRef.current){
        return
    }
  
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')
  
  //Our draw come here
  drawRect(context)
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
      if (!ctx) {
          return
      }
      setCounter(count+1)
    // Fill with gradient
    ctx.fillStyle = createGradient(ctx);
    ctx.fillRect(number()/2, number()/2, number()/2, number()/2);
  }

  const drawCircle = (ctx) => {
    if (!ctx) {
        return
    }
    // draw circle
    ctx.fillStyle = createGradient(ctx);
    ctx.beginPath()
    ctx.arc(number()/2, number()/2, number()/2, number()/2, 2*Math.PI)
    ctx.fill()
  }

  const drawTriangle = (ctx) => {
    if (!ctx) {
        console.log('tris')
        console.log(ctx)
        return
    }
    // draw triangle
    ctx.fillStyle = createGradient(ctx);
    ctx.beginPath();
    ctx.moveTo(number(), number());
    ctx.lineTo(number(), number());
    ctx.lineTo(number(), number());
    ctx.fill();
  }
  const canvas = canvasRef.current
  const context = canvas?.getContext('2d')
  return <>
    <StyledCanvas ref={canvasRef} width="500" height="500"/>
    <button onClick={() => drawTriangle(context)}>Draw Triangle</button>
    <button onClick={() => drawCircle(context)}>Draw Circle</button>
    <button onClick={() => drawRect(context)}>Draw Rectangle</button>
  </>
}

const StyledCanvas = styled.canvas`
  border: 1px solid black;
  margin-top: 50px;
`

export default Canvas