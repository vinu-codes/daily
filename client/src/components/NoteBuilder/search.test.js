const getStrings = (str) => {
  const splitStr = str.split(' ')
  const trimStr = splitStr.map((item) => item.trim())
  const isolatedWords = trimStr.filter((item) => item !== '')
  return isolatedWords
}

const getResults = (data, words) => {
  const result = Object.values(data).reduce((prev, curr) => {
    const { children } = curr
    const updatedChildren = children.filter((child) => {
      const isThere = words.includes(child.label) // true
      return isThere
    })

    const result = {
      [curr.id]: {
        id: curr.id,
        label: curr.label,
        children: updatedChildren,
      },
    }

    return { ...prev, ...result }
  }, {})

  return result
}

// Function
const getSearchables = (data, str) => {
  const isolatedWords = getStrings(str)
  const result = getResults(data, isolatedWords)
  return result
}

// TEST
const defaultData = {
  '01': {
    id: '01',
    label: 'Category a',
    children: [
      { id: 'b', label: 'dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
  '02': {
    id: '02',
    label: 'Category b',
    children: [
      { id: 'c', label: 'cat' },
      { id: 'd', label: 'elephant' },
    ],
  },
}

const defaultDataEmptyChildren = {
  '01': {
    id: '01',
    label: 'Category a',
    children: [],
  },
  '02': {
    id: '02',
    label: 'Category b',
    children: [],
  },
}

describe('getSearchables', () => {
  it('should return the data as we expect', () => {
    const data = { ...defaultData }
    const str = 'dog kangaroo'
    const result = getSearchables(data, str)
    expect(result).toEqual({
      '01': {
        id: '01',
        label: 'Category a',
        children: [
          { id: 'b', label: 'dog' },
          { id: 'd', label: 'kangaroo' },
        ],
      },
      '02': {
        id: '02',
        label: 'Category b',
        children: [],
      },
    })
  })
  describe('getStrings', () => {
    it('should return an array of strings and trim [remove prefix white space and suffix white spaces]', () => {
      const str = ' the dog ran '
      const result = getStrings(str)
      expect(result).toEqual(['the', 'dog', 'ran'])
    })
    it('should return an array of strings and any additonal spaces in the search string provided will be removed', () => {
      const str = 'the   dog ran'
      const result = getStrings(str)
      expect(result).toEqual(['the', 'dog', 'ran'])
    })
  })
  describe('getResults', () => {
    it('should return an empty object literal no matter what happens', () => {
      const data = { ...defaultDataEmptyChildren }
      const words = ['the', 'dog', 'ran']
      const result = getResults(data, words)
      expect(result).toEqual({
        '01': {
          id: '01',
          label: 'Category a',
          children: [],
        },
        '02': {
          id: '02',
          label: 'Category b',
          children: [],
        },
      })
    })
    it(`should return an object literal with each item having a children key's value filtered as a result of words provided as the second argument`, () => {
      const data = { ...defaultData }
      const words = ['dog', 'kangaroo']
      const result = getResults(data, words)
      expect(result).toEqual({
        '01': {
          id: '01',
          label: 'Category a',
          children: [
            { id: 'b', label: 'dog' },
            { id: 'd', label: 'kangaroo' },
          ],
        },
        '02': {
          id: '02',
          label: 'Category b',
          children: [],
        },
      })
    })
  })
})
