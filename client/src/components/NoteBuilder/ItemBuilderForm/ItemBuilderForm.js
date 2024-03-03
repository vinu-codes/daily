import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ItemBuilderForm = () => {
  const onSubmit = () => {}
  return (
    <Container>
      <Form>
        <h2>Item Builder</h2>
        <button onSubmit={onSubmit}>Submit</button>
      </Form>
    </Container>
  )
}

export { ItemBuilderForm }
