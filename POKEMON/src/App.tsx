import axios from 'axios';
import React from 'react'; 

import { useState } from 'react';
import './App.css'


function App() {

  type Pokemon = {
    name: string;
    url: string;
    type: string;
  };

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function searchPokemon() {
    const name = search.toLowerCase();
    if(!name) return;
    setPokemonData([]);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      console.log(response);
      setType(response.data.types[0].type.name);
      setImageUrl(response.data.sprites.front_default);
      setPokemonData([response.data]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Pokemon not found");
    }
  }

  return (
    <>
    <div className="App">

      <div className='search'>
        <input type="text" placeholder='Search Pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={searchPokemon}>Search</button>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='pokemon-container'>
                {pokemonData.length > 0 && pokemonData[0] ? (
                  <div className='pokemon-card'>
                    <h2>{pokemonData[0].name.toUpperCase()}</h2>
                    <img src={imageUrl} alt={pokemonData[0].name} />
                    <p>Type: {type}</p>
                  </div>
                ) : (
                  <p>{error}</p>
                )}
            </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default App;
