import React from 'react'
import '../../src/index.css'
import { InfinitySpin } from 'react-loader-spinner'

const Sniper = () => {
  return (
    <InfinitySpin
      visible={true}
      width="200"
      color="#10B981"
      ariaLabel="infinity-spin-loading"
      className=".spinner"
    />

  )
}

export default Sniper