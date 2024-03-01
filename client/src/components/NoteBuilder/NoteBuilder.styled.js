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
  h2 {
    margin: 0;
    padding: 0;
    padding-bottom: 12px;
  }
`

const Group = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid grey;
  padding: 16px;
  border-radius: 8px;
  h3 {
    padding: 0;
    margin: 0;
  }
`

const ParentDeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

const List = styled.li`
  list-style-type: none;
  border: 1px solid grey;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  textarea {
    position: absolute;
    left: -9999px;
    top: -9999px;
  }
  &:not(:only-child) {
    margin-bottom: 16px;
  }
  span {
    color: grey;
    line-height: 21px;
  }
  span.label {
    font-weight: bold;
    padding-right: 8px;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  svg.CHEVRON {
    transform: rotate(180deg);
    path {
      fill: grey;
    }
  }
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`

export { Container, List, Controls, Group, ParentDeleteButton, Heading }
