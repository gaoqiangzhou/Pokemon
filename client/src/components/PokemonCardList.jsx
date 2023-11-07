import React from 'react'
import PokemonCard from './PokemonCard';
import { usePokemonInfo } from '../context/PokeInfoContext';


const PokemonCardList = ({className}) => {
    const {pokemons} = usePokemonInfo();
  return (
    <div className={"overflow-auto " + className}>
      {(!(pokemons.length === 0)) && 
      <div className="flex flex-col gap-y-1">
        {pokemons.map((poke) => <PokemonCard name = {poke.name} spriteUrl = {poke.spriteUrl} types={poke.types}/>)}
      </div>
      }
    </div>
  )
}

export default PokemonCardList
