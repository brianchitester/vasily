import React, { useEffect, useState } from 'react';
import styled from 'styled-components'


function Toast({message}) {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(!!message)
  },[message])

  setTimeout(() => {
    setShow(false)
  }, 3000)

  return (
      <StyledToastContainer>
          {(show) && (
              <StyledToast>{message}</StyledToast>
          )}
      </StyledToastContainer>
  );
}

const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 50vh;
  right: 50vw;
`

const StyledToast = styled.div`
  font-size: 5em;
`

export default Toast;
