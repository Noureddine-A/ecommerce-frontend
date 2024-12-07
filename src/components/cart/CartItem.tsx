import React from 'react'

const CartItem: React.FC<{name: string}> = (props) => {
  return (
    <div>{props.name}</div>
  )
}

export default CartItem