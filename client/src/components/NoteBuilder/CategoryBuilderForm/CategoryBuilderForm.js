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
  return (
    <Container>
      <h3>Add Category</h3>
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
