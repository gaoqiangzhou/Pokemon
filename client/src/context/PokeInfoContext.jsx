import React, { createContext, useContext, useState } from 'react'

const PokeInfoContext = createContext({
    pokemons: [],
    pokemonsUpdate: () => Promise,
});

export function PokeInfoProvider({children}){
    const [pokemons, setPokemons] = useState([]);
    function updatePokemons(newPokemon)
    {
        setPokemons(newPokemon);
    }

    const contexValue = 
    {
        pokemons: pokemons,
        pokemonsUpdate: updatePokemons,
    }
  return (
    <PokeInfoContext.Provider value = {contexValue}>
      {children}
    </PokeInfoContext.Provider>
  )
}
export function usePokemonInfo()
{
    return useContext(PokeInfoContext);
}



