import React, { useState } from 'react';

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("url",apiUrl)
  const handleSearch = async () => {
    console.log('Searching for:', searchTerm); // Debug log
    try {
      const response = await fetch(`${apiUrl}/pokemon/${searchTerm.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData([data]);
        console.log('Search results:', data); // Debug log
      } else {
        setPokemonData([]);
        console.error('Pokemon not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1 className="main-heading">Pokedex</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a Pokémon..."
      />
      <button onClick={handleSearch}>Search</button>
      {pokemonData.length > 0 && (
        <div>
          {pokemonData.map((pokemon) => (
            <div key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
