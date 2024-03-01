import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { NoteBuilder } from '@components/NoteBuilder'

import './styles.css'

const FakeComponent = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an Axios request here
        const response = await axios.get('/fitness')
        setData(response.data)
      } catch (error) {
        setError(error)
      }
    }

    // Call the fetchData function inside the useEffect
    fetchData()
  }, []) // The empty dependency array means this effect will run once when the component mounts
  console.log(data)
  return <div></div>
}

const root = createRoot(document.getElementById('root'))
root.render(
  <div>
    {/* <FakeComponent /> */}
    <NoteBuilder label={'Git Commands'} />
  </div>
)
