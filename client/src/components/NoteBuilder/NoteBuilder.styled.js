import styled from 'styled-components'

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
  &:not(:only-child) {
    margin-bottom: 16px;
  }
  span {
    color: grey;
  }
`

const Controls = styled.div`
  display: flex;
  margin-left: auto;
  gap: 8px;
  svg.CHEVRON {
    transform: rotate(180deg);
    path {
      fill: grey;
    }
  }
`

export { Container, List, Controls }
