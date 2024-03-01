import React, { useEffect, useState, useRef, createRef } from 'react'
import { Icon } from '@common/Icon'
import {
  List,
  Container,
  Controls,
  Group,
  ParentDeleteButton,
  Heading,
} from './NoteBuilder.styled'
import axios from 'axios'

const RendererItems = ({ items, callback, parentId }) => {
  const textAreaRefs = useRef([])

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
  }

  return items.map((item, index) => {
    return (
      <List key={index}>
        <span className="label">{item.label}:</span>
        <span className="value">{item.value}</span>
        <textarea value={item.value} ref={textAreaRefs.current[index]} />
        <Controls>
          <button className="copy" onClick={() => handleCopy(index)}>
            <Icon name="COPY" />
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
        <Heading>
          <h3>{item.label}</h3>
          <ParentDeleteButton
            onClick={() => callback({ action: 'delete', value: item.id })}
          >
            <Icon name="TRASH" />
          </ParentDeleteButton>
        </Heading>
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
      // "01": {
      //   "id": "01",
      //   "label": "Git Basics",
      //   "children": [
      //     {
      //       "id": "abc-2",
      //       "label": "Add a new branch",
      //       "value": "git branch <branch-name>"
      //     },
      //     {
      //       "id": "abc-3",
      //       "label": "Delete a branch",
      //       "value": "git branch -d <branch-name>"
      //     }
      //   ]
      // }
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
  }

  return (
    <Container>
      <h2>Notes</h2>
      <RendererParent
        items={!!data ? Object.values(data) : []}
        callback={handleCallback}
      />
    </Container>
  )
}

export { NoteBuilder }
