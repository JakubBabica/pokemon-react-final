import { redirect, } from "react-router-dom";
import React, { useState } from 'react';

 
export default function EditContact() {
  async function action() {
    await fetchPokemonDetails();
    return redirect(`/pokemon`);
  }
   async function loader() {
    
  }

  async function fetchPokemonDetails(url) {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon({
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        abilities: data.abilities
      });
      setIsLoading(false);
      setError(null);
    } catch (err) { 
      setIsLoading(false);
      setSelectedPokemon(null);
      setError('Failed to fetch Pokemon details.');
    }
  }
  
  async function fetchPokemonData(startIndex) {
    setIsLoading(true);
    try {
      const limit = 20;
      const offset = startIndex;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit * pageNumber}`);
      const data = await response.json();
      setPokemonData(data.results);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setPokemonData([]);
      setError('Failed to fetch Pokemon.');
    }
  }
  
  async function handlePrevClick () {
    const prevPageNumber = Math.max(0, pageNumber - 1);
    setPageNumber(prevPageNumber);
    const prevStartIndex = prevPageNumber * 20;
    console.log(prevStartIndex)
    fetchPokemonData(prevStartIndex);
  };
  
  async function handleNextClick  () {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber);
    const nextStartIndex = nextPageNumber * 20;
    console.log(nextStartIndex)
    fetchPokemonData(nextStartIndex);
  };
  

  React.useEffect(() => {
    fetchPokemonData(startIndex);
  }, []);
   const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "40px",
    "marginLeft": "80px",
    "margin-top": "30px",
    "font-weight": "bold",
    "fontSize": "30px",
    fontFamily: "Sans-Serif",
    borderRadius: "20px"
  };
  
  return (
    <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <div>
         <button style={{ backgroundColor: "DodgerBlue","fontSize": "30px",padding: "10px","marginLeft": "20px", borderRadius: "30px",color: "black"}} onClick={handlePrevClick}>{"<"}</button>
         <button style={{backgroundColor: "DodgerBlue","fontSize": "30px",padding: "10px","marginLeft": "20px", borderRadius: "30px",color: "black"}} onClick={handleNextClick}>{">"}</button>
        <table style={{ display: "inline-block", textAlign: "center"}}>
          <tbody>
            {pokemonData.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
              .map((row, index) => (
                <tr key={index}>
                  {row.map((pokemon) => (
                    <td key={pokemon.name}>
                      <button style={myStyle} onClick={() => fetchPokemonDetails(pokemon.url)}>{pokemon.name}</button>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {selectedPokemon && (
         <table style={{ position: 'absolute', top: "80px",right:"50px", borderCollapse: "collapse" }}>
         <thead>
           <tr>
             <th style={{border: "1px solid black", padding: "5px"}}>Height</th>
             <th style={{border: "1px solid black", padding: "5px"}}>Weight</th>
             <th style={{border: "1px solid black", padding: "5px"}}>Stats</th>
             <th style={{border: "1px solid black", padding: "5px"}}>Abilities</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td style={{border: "1px solid black", padding: "5px"}}>{selectedPokemon.height}</td>
             <td style={{border: "1px solid black", padding: "5px"}}>{selectedPokemon.weight}</td>
             <td style={{border: "1px solid black", padding: "5px"}}>
               <ul>
                 {selectedPokemon.stats.map((stat) => (
                   <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                 ))}
               </ul>
             </td>
             <td style={{border: "1px solid black", padding: "5px"}}>
               <ul>
                 {selectedPokemon.abilities.map((ability) => (
                   <li key={ability.ability.name}>{ability.ability.name}: {ability.base_ability}</li>
                 ))}
               </ul>
             </td>
           </tr>
         </tbody>
       </table>
       
        )}
      </div>
    )}
  </div>
);
}
