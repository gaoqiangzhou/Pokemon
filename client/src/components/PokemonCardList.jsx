import React from 'react'
import PokemonCard from './PokemonCard';
import { usePokemonInfo } from '../context/PokeInfoContext';


const PokemonCardList = ({className}) => {
    const { pokemons, pokemonsUpdate } = usePokemonInfo();
    const handleRemovePokemon = (pokemonName) => {
      const indexToRemove = pokemons.findIndex((pokemon) => pokemon.name === pokemonName);
        if (indexToRemove !== -1) {
            const updatedPokemons = [...pokemons];
            updatedPokemons.splice(indexToRemove, 1);
            pokemonsUpdate(updatedPokemons);
        }
  };

  return (
    <div className={"overflow-auto " + className}>
      {(!(pokemons.length === 0)) && 
      <div className="flex flex-col gap-y-1">
        {pokemons.map((poke) => <PokemonCard name = {poke.name} spriteUrl = {poke.spriteUrl} types={poke.types} onRemove={handleRemovePokemon}/>)}
      </div>
      }
    </div>
  )
}

export default PokemonCardList