/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const IconPath = (props) => {
  const { stroke = '#A9AEB9' } = props
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect
        x="3"
        y="3.01715"
        width="10.3166"
        height="10.3166"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M5.34277 15.0934V15.2213C5.34277 16.3259 6.2382 17.2213 7.34277 17.2213H14.9999C16.1045 17.2213 16.9999 16.3259 16.9999 15.2213V8.02917C16.9999 6.9666 16.1385 6.10522 15.076 6.10522V6.10522"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default IconPath
