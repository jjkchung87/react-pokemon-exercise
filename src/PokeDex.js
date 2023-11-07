import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import useAxios from "./hooks/useAxios"

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  // const [pokemon, setPokemon] = useState([]);
  // const addPokemon = async name => {
  //   const response = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon/${name}/`
  //   );
  //   setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
  // };

  const formattingFunction = (data) => {
    
    let stats = []

    for(let statistic of data.stats) {
      stats.push({
        value: statistic.base_stat,
        name: statistic.stat.name
      })
    }
    
    return {
      id: uuid(),
      front: data.sprites.front_default,
      back: data.sprites.back_default,
      name: data.name,
      stats: stats
    }
  }

  const [pokemon, addPokemon, clearPokemon] = useAxios("pokemon","https://pokeapi.co/api/v2/pokemon/", formattingFunction)


  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} clearPokemon={clearPokemon}/>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.value,
              name: stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
