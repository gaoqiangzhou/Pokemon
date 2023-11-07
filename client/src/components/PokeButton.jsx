import React from 'react'
import Pokeball from "../image/pokeball.png";

const PokeButton = ({className}) => {
  return (
    <button className = {className}>
      <img src = {Pokeball}/>
    </button>
  )
}

export default PokeButton
