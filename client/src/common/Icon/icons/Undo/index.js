import React from 'react'

const IconPath = (props) => {
  const { stroke = '#A9AEB9' } = props
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" fill="none" />
      <path
        d="M16 16V13.4286C16 10.5883 13.6719 8.28571 10.8 8.28571H3.86667M7.33333 12.5714L3 8.28571L7.33333 4"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconPath
