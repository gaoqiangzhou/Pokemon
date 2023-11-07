import React from 'react'
import TypeBadge from './TypeBadge'

const PokemonCard = (props) => {
  return (
    <div className="bg-gradient-to-r from-[#edfedb] to-[#92f91b] flex flex-row rounded-lg">
      <img src = {props.spriteUrl}></img>
      <div className="flex flex-col">
        <span>{props.name}</span>
        {
          (props.types.length === 1) ? 
          (<div><TypeBadge pokeType = {props.types[0]}/></div>)
          : 
          (<div><TypeBadge pokeType = {props.types[0]}/> / <TypeBadge pokeType = {props.types[1]}/></div>)
        }
      </div>
    </div>
  )
}

export default PokemonCard
