import React, { useEffect, useState } from 'react'
import { Icon } from '@common/Icon'
import { List, Container, Controls } from './NoteBuilder.styled'
import axios from 'axios'

const Renderer = ({ items }) => {
  if (!items || items.length === 0) return null

  return items.map((item, index) => {
    return (
      <List key={index}>
        <span>{item.label}</span>
        <Controls>
          <Icon name="COPY" />
        </Controls>
      </List>
    )
  })
}

const NoteBuilder = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

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

  return (
    <Container>
      <Renderer items={!!data ? Object.values(data) : ''} />
    </Container>
  )
}

export { NoteBuilder }
