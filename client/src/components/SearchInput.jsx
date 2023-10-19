import React, {useState} from 'react'
import DropdownList from "./DropdownList";
import { useSelect } from '../context/selectContext';
import axios from "axios";

const SearchInput = () => {
  const NAMEID_ENDPOINT = (nameorId) =>
  `https://pokeapi.co/api/v2/pokemon/${nameorId}/`;
  const TYPE_ENDPOINT = (type) =>
  `https://pokeapi.co/api/v2/type/${type}/`;
  const {select} = useSelect();
  const types = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting", "Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", "Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy"];

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType1, setPokemonType1] = useState("");
  function handleSubmit(e)
  {
    e.preventDefault();
    const API = (select === "By Pokemon Name/ID") ?
    NAMEID_ENDPOINT(pokemonName) :
    TYPE_ENDPOINT(pokemonType1.toLowerCase());
    axios.get(API).then((res) => console.log(res.data));

  }
  return (
    <div>
      <DropdownList/>
      <form>
        {
          (select === "By Pokemon Name/ID")? 
          (<input value = {pokemonName} onChange = {(e) => {setPokemonName(e.target.value)}}>
          </input>) :
          (<select value = {pokemonType1} onChange = {(e) => setPokemonType1(e.target.value)}>
            {types.map((t) => <option key = {t} value = {t}> {t} </option>)}
          </select>)
        }
        <button onClick={handleSubmit}>Find</button>
      </form>
      <div>{pokemonName}</div>
      <div>{pokemonType1}</div>
    </div>
  )
}

export default SearchInput
