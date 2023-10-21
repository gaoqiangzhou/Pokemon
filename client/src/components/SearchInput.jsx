import React, {useState} from 'react'
import DropdownList from "./DropdownList";
import { useSelect } from '../context/selectContext';
import axios from "axios";
import { usePokemonInfo } from '../context/PokeInfoContext';
import PokemonCard from './PokemonCard';


const SearchInput = () => {
  const {pokemons, pokemonsUpdate} = usePokemonInfo();
  const NAMEID_ENDPOINT = (nameorId) =>
  `https://pokeapi.co/api/v2/pokemon/${nameorId}/`;
  const TYPE_ENDPOINT = (type) =>
  `https://pokeapi.co/api/v2/type/${type}/`;
  const {select} = useSelect();
  const types = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting", "Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", "Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy"];
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType1, setPokemonType1] = useState("Normal");
  const [typeUrls, setTypeUrls] = useState([]);


  function handleSubmit(e)
  {
    
    e.preventDefault();
    pokemonsUpdate([]);
    setTypeUrls([]);
    const API = (select === "By Pokemon Name/ID") ?
    NAMEID_ENDPOINT(pokemonName) :
    TYPE_ENDPOINT(pokemonType1.toLowerCase());
    if(select === "By Pokemon Name/ID")
    {
      axios.get(API).then((res) => {
        const data = res.data;
        const name = data.name;
        const types = data.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
        const spriteUrl = data.sprites.front_default;
        const pk = {
          name: name,
          types: types,
          spriteUrl: spriteUrl,
        }
        pokemonsUpdate((prev) => [...prev, pk]);
      })
    }else
    {
      axios.get(API).then((res) => {
        setTypeUrls((prev) => res.data.pokemon.map((each) => each.pokemon.url));
      });
      for(let i=0; i<typeUrls.length; ++i)
      {
        axios.get(typeUrls[i]).then((res) => {
          const data = res.data;
          const name = data.name;
          const types = data.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
          const spriteUrl = data.sprites.front_default;
          const pk = {
            name: name,
            types: types,
            spriteUrl: spriteUrl,
        }
        pokemonsUpdate((prev) => [...prev, pk]);
        })
      }
    }
    

  }
  return (
    <div className="flex flex-row w-full">
      <DropdownList/>
      <form className="w-full flex flex-col items-center">
        {
          (select === "By Pokemon Name/ID")? 
          (<input className="w-full h-1/6 rounded-full shadow-[4px_4px_6px_0px_rgba(255,255,255,.3),-4px_-4px_6px_0px_rgba(116,125,136,.2),inset_-4px_-4px_6px_0px_rgba(255,255,255,.2),inset_4px_4px_6px_0px_rgba(0,0,0,.2)]" value = {pokemonName} onChange = {(e) => {setPokemonName(e.target.value)}}>
          </input>) :
          (<select className="w-full h-1/6 rounded-full shadow-[4px_4px_6px_0px_rgba(255,255,255,.3),-4px_-4px_6px_0px_rgba(116,125,136,.2),inset_-4px_-4px_6px_0px_rgba(255,255,255,.2),inset_4px_4px_6px_0px_rgba(0,0,0,.2)]" value = {pokemonType1} onChange = {(e) => setPokemonType1(e.target.value)}>
            {types.map((t) => <option key = {t} value = {t}> {t} </option>)}
          </select>)
        }
          <button className="p-0 w-1/2 h-1/6 border-2 border-[#000000] rounded-full bg-gradient-to-b from-[#ef594f] from-50% to-[#FFFFFF] to-50%" onClick={handleSubmit}>POKÉMON</button>
      </form>
    </div>
  )
}

export default SearchInput
