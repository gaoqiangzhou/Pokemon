import React from 'react'
import TypeBadge from './TypeBadge'

const PokemonCard = (props) => {
  return (
    <div className="bg-gradient-to-r from-[#edfedb] to-[#92f91b] flex flex-row rounded-lg">
      <div className="flex flex-col">
        <span>{props.name}</span>
        <div><TypeBadge pokeType = {props.primary}/> / <TypeBadge pokeType = {props.secondary}/></div>
      </div>
    </div>
  )
}

export default PokemonCard