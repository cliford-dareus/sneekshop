import React from 'react'

type Props = {
    name: string
}

const Label = ({name}: Props) => {
  return (
    <label>{name}</label>
  )
}

export default Label