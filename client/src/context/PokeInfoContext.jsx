import React, { createContext, useContext, useState } from 'react'

const PokeInfoContext = createContext({
    pokemons: [],
    selectPks: [],
    pokemonsUpdate: () => Promise,
    selectPksUpdate: () => Promise,
});

export function PokeInfoProvider({children}){
    const [pokemons, setPokemons] = useState([]);
    const [selectPks, setSelectPks] = useState([]);
    function updatePokemons(newPokemon)
    {
        setPokemons(newPokemon);
    }
    function updateSelectPks(newSelect)
    {
      setSelectPks(newSelect);
    }

    const contexValue = 
    {
        pokemons: pokemons,
        selectPks: selectPks,
        pokemonsUpdate: updatePokemons,
        selectPksUpdate: updateSelectPks
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



