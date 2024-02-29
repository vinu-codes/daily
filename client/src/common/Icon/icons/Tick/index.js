/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const IconPath = (props) => {
  const { fill = '#19B244' } = props
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="10" fill={fill} />
      <path
        d="M5 11.25L7.5 13.75L15 6.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconPath
