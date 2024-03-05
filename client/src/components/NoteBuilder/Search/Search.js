import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  button {
    padding: 10px 20px;
    background-color: #4d90fe;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #357ae8;
    }
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  line-height: 21px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:focus {
    border-color: #4d90fe;
  }
`

const Search = ({ callback }) => {
  const [value, setValue] = useState()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter search term..."
        onChange={handleChange}
        value={value}
      />
      <button>Search</button>
    </Container>
  )
}

export { Search }
