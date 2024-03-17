import React, { useState, useEffect } from 'react'
import { Container, Input } from './Search.styled'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  // we are getting the value and delay from the input so we can delay when to show the results
  useEffect(() => {
    setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout()
  }, [value, delay])

  return debouncedValue
}

const Search = ({ callback, data }) => {
  const [value, setValue] = useState()
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (!debouncedValue) return
    translateSearch(debouncedValue)
  }, [debouncedValue])

  const translateSearch = (debouncedValue) => {
    // callback({ payload })
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

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
