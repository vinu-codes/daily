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
import { Search } from './Search'
import axios from 'axios'
import { uuid } from '@utils/uuid'

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
                action: 'DELETE_ITEM',
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

const RendererParent = ({ items, callback, parentId }) => {
  if (!items || items.length === 0) return null

  return items.map((item, index) => {
    console.log(item)
    return (
      <Group
        key={index}
        className={parentId === item.id ? 'group active' : 'group'}
      >
        <Header>
          <h3>{item.label}</h3>
          <div>
            <ParentAddButton
              onClick={() => callback({ action: 'OPEN_ITEM', value: item.id })}
            >
              <Icon name="CLOSE" />
            </ParentAddButton>
            <ParentDeleteButton
              onClick={() =>
                callback({ action: 'DELETE_CATEGORY', value: item.id })
              }
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
  const [parentId, setParentId] = useState('')

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

  const deleteCategory = async ({ payload }) => {
    try {
      const response = await axios.delete(`/fitness/delete/${payload}`)
      setData(response.data.payload)
    } catch (error) {
      setError(error)
    }
  }

  const deleteItem = async ({ payload }) => {
    const result = data[payload.parentId].children.filter((item) => {
      return item.id !== payload.childId
    })

    const body = {
      id: payload.parentId,
      label: data[payload.parentId].label,
      children: result,
    }

    try {
      const response = await axios.put(
        `/fitness/update/${payload.parentId}`,
        body
      )
      setData(response.data.payload)
    } catch (error) {
      setError(error)
    }
  }

  const addCategory = async ({ payload }) => {
    const body = { label: payload, children: [] }
    try {
      const response = await axios.post(`/fitness/create`, body)
      setData(response.data.payload)
    } catch (error) {
      setError(error)
    }
  }

  const addItem = async ({ payload }) => {
    console.log({ payload })
    const id = payload.activeId
    const prevChildren = data[payload.activeId].children
    const label = data[payload.activeId].label
    const item = {
      label: payload.labelInput,
      value: payload.valueInput,
      id: uuid(),
      timestamp: new Date().toISOString(),
    }
    const children = [...prevChildren, item]

    const body = {
      id,
      label,
      children,
    }

    try {
      const response = await axios.put(`/fitness/update/${parentId}`, body)
      setData(response.data.payload)
    } catch (error) {
      setError(error)
    }
  }

  const handleCallback = async ({ action, value }) => {
    if (action === 'DELETE_CATEGORY') {
      deleteCategory({ payload: value })
    }
    if (action === 'DELETE_ITEM') {
      deleteItem({
        payload: { parentId: value.parentId, childId: value.childId },
      })
    }
    if (action === 'ADD_CATEGORY') {
      addCategory({ payload: value })
    }
    if (action === 'ADD_ITEM') {
      console.log({ value })
      // value: {labelInput: '', valueInput: '', activeId: ''}
      addItem({
        payload: {
          labelInput: value.labelInput,
          valueInput: value.valueInput,
          activeId: value.activeId,
        },
      })
    }
    if (action === 'OPEN_CATEGORY') {
      setEnableMenu(true)
      setActiveMenuId('CATEGORY')
    }
    if (action === 'OPEN_ITEM') {
      setEnableMenu(true)
      setActiveMenuId('ITEM')
      setParentId(value)
    }
    if (action === 'CLOSE') {
      setEnableMenu(false)
      setParentId(null)
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
        <Search callback={handleCallback} />
        <RendererParent
          items={!!data ? Object.values(data) : []}
          callback={handleCallback}
          parentId={parentId}
        />
      </Container>
      {enableMenu && activeMenuId === 'ITEM' && (
        <ItemBuilderForm callback={handleCallback} activeId={parentId} />
      )}
      {enableMenu && activeMenuId === 'CATEGORY' && (
        <CategoryBuilderForm callback={handleCallback} />
      )}
    </MainContainer>
  )
}

export { NoteBuilder }
