import { Icon } from '@common/Icon'
import React, { useState, useRef, useEffect } from 'react'
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
  }
`

const CategoryBuilderForm = ({ callback = () => {} }) => {
  const ref = useRef(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    ref.current.focus()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    callback({ action: 'ADD_CATEGORY', value: value })
    setValue('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    callback({ action: 'ADD_CATEGORY', value: value })
    setValue('')
  }
  const onChange = (e) => {
    const { value } = e.target
    setValue(value)
  }

  const handleClose = () => {
    callback({ action: 'CLOSE' })
  }

  return (
    <Container>
      <HeaderContainer>
        <h3>Add Category</h3>
        <button className="close" onClick={handleClose}>
          <Icon name="CLOSE" />
        </button>
      </HeaderContainer>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="category"
          value={value}
          onChange={onChange}
          ref={ref}
        />
        <button onClick={handleSubmit}>Submit</button>
      </Form>
    </Container>
  )
}

export { CategoryBuilderForm }
