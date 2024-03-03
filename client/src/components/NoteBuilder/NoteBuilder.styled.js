import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid grey;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  width: calc(100% - 40px);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  h2 {
    margin: 0;
    padding: 0;
    padding-bottom: 12px;
  }
`

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  button.open-category {
    svg {
      transform: rotate(45deg);
    }
  }
`

const Group = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
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
const ParentAddButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  svg {
    transform: rotate(45deg);
  }
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
  &.active {
    background: #9affc2;
  }
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`

export {
  Container,
  List,
  Controls,
  Group,
  ParentDeleteButton,
  ParentAddButton,
  Header,
  ContainerHeader,
  MainContainer,
}
