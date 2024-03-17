import { useState, useEffect } from 'react'

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

export { useDebounce }
