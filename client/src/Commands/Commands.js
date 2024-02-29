import React from 'react'
import styled from 'styled-components'
import { Icon } from '@common/Icon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50%;
  border: 1px solid grey;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
`

const List = styled.li`
  list-style-type: none;
  border: 1px solid grey;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  width: 90%;
  &:not(:first-child) {
    margin-bottom: 16px;
  }
  span {
    color: grey;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  svg.CHEVRON {
    transform: rotate(180deg);
    path {
      fill: grey;
    }
  }
`

const SubContainer = ({ label, description, children }) => {
  return <List>{children}</List>
}

const convertData = (dataObj) => {
  const result = Object.values(dataObj).map((item, index) => {
    return (
      <SubContainer key={index}>
        <span>{item.label}</span>
        <Controls>
          <Icon name="CHEVRON" />
          <Icon name="COPY" />
        </Controls>
      </SubContainer>
    )
  })
  return result
}

const accounts = {
  '01': {
    label: 'git branch <branch-name>',
    description: 'This command will create a branch locally.',
    children: [
      {
        id: 'abc-2',
        label: 'Username',
        value: 'abc@gmail.com',
        description: 'This is the description of this item',
      },
    ],
  },
  '02': {
    label: 'git branch <branch-name>',
    description: 'This command will create a branch locally.',
    children: [
      {
        id: 'abc-2',
        label: 'Username',
        value: 'abc@gmail.com',
        description: 'This is the description of this item',
      },
    ],
  },
}

const Commands = () => {
  const renderInfo = convertData(accounts)
  return (
    <Container>
      <h2>Git Commands</h2>
      {renderInfo}
    </Container>
  )
}

export { Commands }
