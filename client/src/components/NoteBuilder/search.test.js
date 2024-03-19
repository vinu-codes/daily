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
      { id: 'b', label: 'dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
}
const defaultDataWithSpaces = {
  '01': {
    id: '01',
    label: 'Category a',
    children: [
      { id: 'b', label: 'the dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
  '02': {
    id: '02',
    label: 'Category b',
    children: [
      { id: 'b', label: 'dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
}
const newData = {
  '01': {
    id: '01',
    label: 'Git commands',
    children: [
      { id: 'b', label: 'the dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
  '02': {
    id: '02',
    label: 'Cooking notes',
    children: [
      { id: 'b', label: 'dog' },
      { id: 'd', label: 'kangaroo' },
    ],
  },
}

const getStrings = (str) => {
  const splitStr = str.split(' ')
  const trimStr = splitStr.map((x) => x.trim())
  // remove the items that have empty strings
  const isolatedWords = trimStr
    .filter((item) => item !== '')
    .map((x) => x.toLowerCase())
  return isolatedWords
}

const includesPartial = (searchWord, list) =>
  list.some((item) => item.includes(searchWord))

const getIncludedResults = (searchWord) => (listWords) => {
  if (!searchWord || !listWords.length) return false

  return includesPartial(searchWord, listWords)
}

const filterOutputs = (words, options) => {
  const result = words.filter((word) => {
    getIncludedResults(word)(getStrings(options.label))
  })
  return result
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

    return filteredResults
  }

describe('getResults', () => {
  it('should return an empty array', () => {
    const options = []
    const words = []
    const result = getResults(options)(words)
    expect(result).toEqual([])
  })
  it('should return one object in the array with the label of git commands and count: 1', () => {
    const options = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
      },
    ]
    const words = ['git']
    const result = getResults(options)(words)
    const equalValue = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
        count: 1,
      },
    ]
    expect(result).toEqual(equalValue)
  })
  it('should return an array with the labels that match the searchWords with the count variable showing how many times it matched', () => {
    const options = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
      },
    ]
    const words = ['git', 'comm']
    const result = getResults(options)(words)
    const equalValue = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
        count: 2,
      },
    ]
    expect(result).toEqual(equalValue)
  })
  it('should return an array with the labels that match the searchWords ordered in most matched to least matched', () => {
    const options = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
      },
    ]
    const words = ['git', 'comm', 'notes']
    const result = getResults(options)(words)
    const equalValue = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
        count: 2,
      },
    ]
    expect(result).toEqual(equalValue)
  })
  it('should return an array with the labels that match the searchWords ordered in most matched to least matched', () => {
    const options = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
      },
    ]
    const words = ['git', 'comm', 'notes', 'coo']
    const result = getResults(options)(words)
    const equalValue = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
        count: 2,
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
        count: 2,
      },
    ]
    expect(result).toEqual(equalValue)
  })
  it('should return an empty array', () => {
    const options = [
      {
        id: '01',
        label: 'Git commands',
        children: [],
      },
      {
        id: '02',
        label: 'Cooking notes',
        children: [],
      },
    ]
    const words = ['dog']
    const result = getResults(options)(words)
    const equalValue = []
    expect(result).toEqual(equalValue)
  })
  describe('getStrings', () => {
    it('should return an array of strings', () => {
      const payload = 'hello world'
      const result = ['hello', 'world']
      expect(getStrings(payload)).toEqual(result)
    })
    it('should return an array of strings with no empty strings as an item in the array', () => {
      const payload = 'hello world '
      const result = ['hello', 'world']
      expect(getStrings(payload)).toEqual(result)
    })
    it('should return an array of strings with no empty strings as an item in the array', () => {
      const payload = 'hello world  it is me '
      const result = ['hello', 'world', 'it', 'is', 'me']
      expect(getStrings(payload)).toEqual(result)
    })
  })
  describe('getIncludedResults', () => {
    it('should return a function that checks if the search word is partially a substring of each item of the list', () => {
      const search = 'an'
      const words = ['apple', 'banana', 'cherry']

      // returns a fn called includedResults()
      const includedResults = getIncludedResults(search)
      expect(typeof includedResults).toBe('function')

      const result1 = includedResults(words)
      expect(result1).toBe(true)

      const result2 = includedResults([])
      expect(result2).toBe(false)

      const result3 = includedResults(['grapes'])
      expect(result3).toBe(false)
    })
    it('should return false if search word is empty', () => {
      const search = ''
      const list = ['apple', 'banana', 'cherry']
      const includedResults = getIncludedResults(search)
      const result = includedResults(list)
      expect(result).toBe(false)
    })
    it('should return false if search word and list is empty', () => {
      const search = ''
      const list = []
      const includedResults = getIncludedResults(search)
      const result = includedResults(list)
      expect(result).toBe(false)
    })
    describe('includesPartial', () => {
      it('should return true if any item (string) in the list includes the word partially', () => {
        const list = ['apple', 'banana', 'cherry']
        const searchWord = 'an'
        expect(includesPartial(searchWord, list)).toBe(true)
      })
      it('should return false if no item (string) in the list includes the searchWord partially', () => {
        const list = ['apple', 'banana', 'cherry']
        const searchWord = 'grape'
        expect(includesPartial(searchWord, list)).toBe(false)
      })
      it('should return true if the searchWord is an empty string', () => {
        const list = ['apple', 'banana', 'cherry']
        const searchWord = ''
        expect(includesPartial(searchWord, list)).toBe(true)
      })
      it('should return false if the list is empty', () => {
        const list = []
        const searchWord = 'banana'
        expect(includesPartial(searchWord, list)).toBe(false)
      })
      it('should return false if both the list and searchWord are empty', () => {
        const list = []
        const searchWord = ''
        expect(includesPartial(searchWord, list)).toBe(false)
      })
      it('should return true if the searchWord is included in the array', () => {
        const list = ['the', 'dog']
        const searchWord = ['dog']
        expect(includesPartial(searchWord, list)).toBe(true)
      })
    })
  })
})
