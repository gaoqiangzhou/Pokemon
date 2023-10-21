import React from 'react'
import PokemonCard from './PokemonCard';
import { usePokemonInfo } from '../context/PokeInfoContext';

const PokemonCardList = () => {
    const {pokemons} = usePokemonInfo();
  return (
    <div className="absolute h-2/3 mt-[-170px] w-1/3 overflow-scroll">
      {(!(pokemons.length === 0)) && 
      <div className="flex flex-col w-full">
        {pokemons.map((poke) => <PokemonCard name = {poke.name} spriteUrl = {poke.spriteUrl} types={poke.types}/>)}
      </div>
      }
    </div>
  )
}

export default PokemonCardList
