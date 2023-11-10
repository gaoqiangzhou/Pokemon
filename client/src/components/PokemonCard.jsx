import React from 'react';
import TypeBadge from './TypeBadge';

const PokemonCard = (props) => {
  const handleRemovePokemon = () => {
    if (props.onRemove) {
        props.onRemove(props.name);
    }
    };
    return (
        <div className="bg-gradient-to-r from-[#edfedb] to-[#92f91b] flex flex-row rounded-lg">
            <img src={props.spriteUrl} alt={props.name} />
            <div className="flex flex-col">
                <span>{props.name}</span>
                {
                  (props.types.length === 1) ? 
                    (<div><TypeBadge pokeType={props.types[0]} /></div>)
                    : 
                    (<div><TypeBadge pokeType={props.types[0]} /> / <TypeBadge pokeType={props.types[1]} /></div>) 
                }
            </div>
            <button
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={handleRemovePokemon}
            >
                X
            </button>
        </div>
    );
};

export default PokemonCard;



