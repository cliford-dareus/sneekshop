import classNames from 'classnames'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className: string
  onclick?: () => any
}

const Button = ({children, className, onclick}: Props) => {
  return (
    <div className={classNames('flex py-[5px] px-4 cursor-pointer', className) } onClick={onclick}>
      {children}
    </div>
  )
}

export default Button