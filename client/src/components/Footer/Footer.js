import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: gray;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  z-index: 100;
  position: fixed;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`
const FooterContents = styled.div``

const Footer = () => {
  return (
    <FooterContainer>
      <h2></h2>
    </FooterContainer>
  )
}

export { Footer }
