import React, { useState, useEffect } from 'react'
import { Container, Input } from './Search.styled'

const getStrings = (str) => {
  if (!str || !str.length) return []
  const splitStr = str.split(' ')
  const trimStr = splitStr.map((x) => x.trim())
  const isolatedWords = trimStr
    .filter((x) => x !== '')
    .map((x) => x.toLowerCase())
  console.log(isolatedWords)
  return isolatedWords
}

const includesPartial = (searchWord, list) =>
  list.some((item) => item.includes(searchWord))

const getIncludedResults = (searchWord) => (listWords) => {
  if (!searchWord || !listWords.length) return false

  return includesPartial(searchWord, listWords)
}

const getResults =
  (options = []) =>
  (words = []) => {
    let maxCount = 0

    const scoredGroups = options.reduce((prev, curr) => {
      const filteredOutput = words.filter((word) =>
        getIncludedResults(word)(getStrings(curr.label))
      )

      const count = filteredOutput.length

      const result = {
        ...curr,
        count,
      }

      if (count > 0) {
        maxCount = Math.max(maxCount, count)
        return [...prev, result]
      }

      return prev
    }, [])

    const filteredResults = scoredGroups.filter(
      (result) => result.count === maxCount
    )
    console.log(filteredResults)
    return filteredResults
  }

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

const Search = ({ callback, data = [] }) => {
  const [value, setValue] = useState()
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (!debouncedValue) return
    translateSearch(debouncedValue)
  }, [debouncedValue])

  const translateSearch = (debouncedValue) => {
    const searchStrings = getStrings(debouncedValue)
    const result = getResults(searchStrings, data)
    return result
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.type === 'click') {
      console.log('clicked')
    }
    // callback({ action: 'SET_SEARCH', value: result })
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter search term..."
        onChange={handleChange}
        onKeyPress={handleSearch}
        value={value}
      />

      <button onClick={handleSearch}>Search</button>
    </Container>
  )
}

export { Search }
