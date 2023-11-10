import React, { useState } from 'react';
import axios from 'axios';
import { usePokemonInfo } from '../context/PokeInfoContext';

const SearchBar = () => {
    const { pokemons, pokemonsUpdate } = usePokemonInfo();
    const NAMEID_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
    const TYPE_ENDPOINT = "https://pokeapi.co/api/v2/type/";
    const SPRITE = (num) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
    const [searchInput, setSearchInput] = useState("");
    const [searchAPI, setSearchAPI] = useState(NAMEID_ENDPOINT);
    const types = ["Normal", "Fire", "Water", "Grass", "Flying", "Fighting", "Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", "Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy"];

    async function getOnePokemon(API) {
        const res = await axios.get(API);
        const data = res.data;
        const name = data.name;
        const id = data.id;
        const types = data.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
        const spriteUrl = SPRITE(id);
        const pk = {
            name: name,
            types: types,
            spriteUrl: spriteUrl,
        }
        return pk;
    }

    async function getURLs(API) {
        const res = await axios.get(API);
        const data = res.data;
        const urlList = data.pokemon.map((each) => each.pokemon.url);
        return urlList;
    }

    async function getMultiplePokemons(APIs) {
        const requests = APIs.map((API) => axios.get(API));
        const responses = await Promise.all(requests);
        const newPokemons = [];

        responses.forEach((ea) => {
            const data = ea.data;
            const name = data.name;
            const types = data.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
            const spriteUrl = SPRITE(data.id);
            const pk = {
                name: name,
                types: types,
                spriteUrl: spriteUrl,
            }
            newPokemons.push(pk);
        });

        pokemonsUpdate((prev) => [...prev, ...newPokemons]);
    }

    function handleSelectPokemon(pk) {
        if (pokemons.length >= 6) {
            alert("You have already selected 6 Pokémon.");
            return;
        }

        pokemonsUpdate((prev) => [...prev, pk]);
    }

    function handleClick(e) {
        e.preventDefault();
        const API = searchAPI + searchInput.toLowerCase();
        if (searchAPI === NAMEID_ENDPOINT) {
            getOnePokemon(API).then((pk) => {
                handleSelectPokemon(pk);
            });
        } else {
            getURLs(API).then((urls) => {
                getMultiplePokemons(urls);
            });
        }
    }

    return (
        <div className="flex flex-col gap-2 justify-center">
            <form className="flex flex-row gap-x-1">
                <select onChange={(e) => { setSearchAPI(e.target.value); (e.target.value === TYPE_ENDPOINT) ? setSearchInput("Normal") : setSearchInput("") }} className="bg-blue-400 p-0 w-1/3 flex items-center justify-between font-bold text-xs rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white hover:border-white">
                    <option value={NAMEID_ENDPOINT} className="font-bold">By Name/ID</option>
                    <option value={TYPE_ENDPOINT} className="font-bold">By Type</option>
                </select>
                {searchAPI === NAMEID_ENDPOINT ? (
                    <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} className="w-2/3 rounded-lg"></input>
                ) : (
                    <select value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} className="w-2/3 rounded-lg">
                        {types.map((t) => <option key={t} value={t}> {t} </option>)}
                    </select>
                )}
                <button className="items-center whitespace-nowrap rounded px-3 py-1.5 cursor-pointer" onClick={handleClick}>
                    <svg viewBox="0 0 20 20" className="h-5 w-5">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;


