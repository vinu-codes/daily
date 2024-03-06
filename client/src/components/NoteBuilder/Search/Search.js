import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  button {
    padding: 10px 20px;
    background-color: #4d90fe;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #357ae8;
    }
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  line-height: 21px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:focus {
    border-color: #4d90fe;
  }
`

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout()
  }, [value, delay])

  return debouncedValue
}

const filterData = (data, debouncedValue) => {
  if (!debouncedValue) return data
  const items = Object.values(data)

  console.log({ items })

  return items.children.filter((item) => {
    return item.label.toLowerCase().includes(debouncedValue.toLowerCase())
  })
}

const Search = ({ callback, data }) => {
  const [value, setValue] = useState()
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const translateSearch = (debouncedValue) => {
    // check if debounced value is true, and if it is, trim it so that it removes any
    // whitespace from the beginning and end of the string

    const payload = (!!debouncedValue && debouncedValue.trim()) || ''

    // const result = filterData(data, payload)

    // console.log(result)

    callback({ action: 'UPDATE', payload: '' })
  }

  useEffect(() => {
    if (!debouncedValue) return
    translateSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter search term..."
        onChange={handleChange}
        value={value}
      />

      <button>Search</button>
    </Container>
  )
}

export { Search }
