import React from 'react'
import styled from 'styled-components'
import { Icon } from '@common/Icon'

const NavContainer = styled.div`
  width: 100%;
  background: gray;
  position: fixed;
  top: 0;
  z-index: 999;
  height: 72px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20px;
  h3 {
    margin: 0;
  }
  button.settings {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    svg {
      path {
        stroke: black;
      }
    }
  }
`

const NavBar = () => {
  return (
    <NavContainer>
      <h3>Daily App</h3>
      <button className="settings"></button>
    </NavContainer>
  )
}

export { NavBar }
