import React, { useEffect, useState, useRef, createRef } from 'react'
import { Icon } from '@common/Icon'
import {
  List,
  Container,
  Controls,
  Group,
  ParentDeleteButton,
  ParentAddButton,
  Header,
  ContainerHeader,
  MainContainer,
} from './NoteBuilder.styled'
import { CategoryBuilderForm } from './CategoryBuilderForm'
import { ItemBuilderForm } from './ItemBuilderForm'
import axios from 'axios'

const RendererItems = ({ items, callback, parentId }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const textAreaRefs = useRef([])

  useEffect(() => {
    if (selectedIndex !== null) {
      const timer = setTimeout(() => {
        setSelectedIndex(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [selectedIndex])

  textAreaRefs.current =
    !!items &&
    items.map((_, index) =>
      textAreaRefs.current[index] ? textAreaRefs.current[index] : createRef()
    )

  console.log({ textAreaRefs })

  if (!items || items.length === 0) return null

  const handleCopy = (index) => {
    console.log({ index })
    if (textAreaRefs.current[index]) {
      textAreaRefs.current[index].current.select()
      document.execCommand('copy')
    }
    setSelectedIndex(index)
  }

  return items.map((item, index) => {
    return (
      <List
        key={index}
        className={selectedIndex === index ? 'list active' : 'list'}
      >
        <span className="label">{item.label}:</span>
        <span className="value">{item.value}</span>
        <textarea value={item.value} ref={textAreaRefs.current[index]} />
        <Controls>
          <button className="copy" onClick={() => handleCopy(index)}>
            <Icon name={selectedIndex === index ? 'TICK' : 'COPY'} />
          </button>
          <button
            className="delete"
            onClick={() =>
              callback({
                action: 'update',
                value: { parentId, childId: item.id },
              })
            }
          >
            <Icon name="TRASH" />
          </button>
        </Controls>
      </List>
    )
  })
}

const RendererParent = ({ items, callback }) => {
  if (!items || items.length === 0) return null

  return items.map((item, index) => {
    return (
      <Group key={index}>
        <Header>
          <h3>{item.label}</h3>
          <div>
            <ParentAddButton onClick={() => callback({ action: 'OPEN_ITEM' })}>
              <Icon name="CLOSE" />
            </ParentAddButton>
            <ParentDeleteButton
              onClick={() => callback({ action: 'delete', value: item.id })}
            >
              <Icon name="TRASH" />
            </ParentDeleteButton>
          </div>
        </Header>
        <RendererItems
          items={item.children}
          callback={callback}
          parentId={item.id}
        />
      </Group>
    )
  })
}

const NoteBuilder = ({ label }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [activeMenuId, setActiveMenuId] = useState('')
  const [enableMenu, setEnableMenu] = useState(false)

  console.log({ data })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fitness')
        console.log(response.data)
        setData(response.data.payload)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])

  const handleCallback = async ({ action, value }) => {
    if (action === 'delete') {
      try {
        const response = await axios.delete(`/fitness/delete/${value}`)
        console.log(response.data, 'delete response')
        setData(response.data.payload)
      } catch (error) {
        setError(error)
      }
    }
    if (action === 'update') {
      const result = data[value.parentId].children.filter((item) => {
        return item.id !== value.childId
      })

      console.log({ result })
      const payload = { id: '01', label: 'Philip', children: result }
      try {
        const response = await axios.put(
          `/fitness/update/${value.parentId}`,
          payload
        )
        console.log(response.data, 'update response')
        setData(response.data.payload)
      } catch (error) {
        setError(error)
      }
    }
    if (action === 'ADD_CATEGORY') {
      const body = { label: value, children: [] }
      try {
        const response = await axios.post(`/fitness/create`, body)
        setData(response.data.payload)
      } catch (error) {
        setError(error)
      }
    }
    if (action === 'OPEN_CATEGORY') {
      setEnableMenu(true)
      setActiveMenuId('CATEGORY')
    }
    if (action === 'OPEN_ITEM') {
      setEnableMenu(true)
      setActiveMenuId('ITEM')
    }
  }

  return (
    <MainContainer>
      <Container>
        <ContainerHeader>
          <h2>Notes</h2>
          <button
            className="open-category"
            onClick={() => handleCallback({ action: 'OPEN_CATEGORY' })}
          >
            <Icon name="CLOSE" />
          </button>
        </ContainerHeader>
        <RendererParent
          items={!!data ? Object.values(data) : []}
          callback={handleCallback}
        />
      </Container>
      {enableMenu && activeMenuId === 'ITEM' && (
        <ItemBuilderForm callback={handleCallback} />
      )}
      {enableMenu && activeMenuId === 'CATEGORY' && (
        <CategoryBuilderForm callback={handleCallback} />
      )}
    </MainContainer>
  )
}

export { NoteBuilder }
