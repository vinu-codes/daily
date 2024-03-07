import React, { useState, useEffect } from 'react'
import { Container, Input } from './Search.styled'

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

    // console.log(result)

    callback({ action: 'UPDATE', payload: '' })
  }

  // we cannot use .includes() as it will not work with multiple words
  // so we have to use .split() to split the string into an array
  // const STR = 'the dog ran'

  // const result = STR.includes('ran dog')

  // console.log(result)

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
