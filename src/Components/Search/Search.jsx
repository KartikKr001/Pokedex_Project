import React, { useState, useEffect } from 'react';
import '../Search/Search.css';
import usePokemonList from '../Hooks/usePokemonList';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { pokemonListStates , setPokemonListStates } = usePokemonList(`${apiUrl}/pokemon?limit=1000`);
  const [prevC, setPrev] = useState(5);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPokemons([]);
    } else {
      setFilteredPokemons(
        pokemonListStates.ListOfPokemons.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, pokemonListStates]);

  const resetSearch = () => {
    setSearchQuery('');
    setFilteredPokemons([]);
  };

  return (
    <div className='search-wrapper'>
      <input 
        type="text" 
        placeholder="Search Pokémon" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredPokemons.slice(0, prevC).map(p => (
          <li key={p.name}>
            {p.name}
          </li>
        ))}
      </ul>
      {searchQuery !== "" && (
        <button onClick={() => setPrev(prevC + 5)}>Load More</button>
      )}
    </div>
  );
};

export default Search;
