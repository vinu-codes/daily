import { Icon } from '@common/Icon'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 16px;
  h3 {
    margin: 0;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  button.close {
    background: none;
    border: none;
    margin-left: auto;
    cursor: pointer;
  }
`

const Form = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  button {
    margin-top: 8px;
    align-self: flex-start;
  }
  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid grey;
    margin-bottom: 8px;
  }
`

const ItemBuilderForm = ({ callback, activeId }) => {
  console.log({ activeId })
  const [inputValue, setInputValue] = useState({
    labelInput: '',
    valueInput: '',
  })

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    callback({ action: 'ADD_ITEM', value: { ...inputValue, activeId } })
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }

  const handleClose = () => {
    callback({ action: 'CLOSE' })
  }

  return (
    <Container>
      <HeaderContainer>
        <h3>Item Builder</h3>
        <button className="close" onClick={handleClose}>
          <Icon name="CLOSE" />
        </button>
      </HeaderContainer>
      <Form onSubmit={onSubmit}>
        <input
          placeholder="Label"
          ref={ref}
          value={inputValue.labelInput}
          name="labelInput"
          onChange={handleChange}
        />
        <input
          placeholder="Value"
          name="valueInput"
          value={inputValue.valueInput}
          onChange={handleChange}
        />
        <button onSubmit={onSubmit}>Submit</button>
      </Form>
    </Container>
  )
}

export { ItemBuilderForm }
