import React, { useState, useEffect } from 'react';
import '../Search/Search.css';
import usePokemonList from '../Hooks/usePokemonList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const apiUrl = "https://pokeapi.co/api/v2";
  const { pokemonListStates , setPokemonListStates } = usePokemonList(`${apiUrl}/pokemon?limit=1000`);
  const [prevC, setPrev] = useState(5);
  console.log("list recieved: ",pokemonListStates);
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPokemons([]);
    } else {
        const temList = pokemonListStates.ListOfPokemons.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredPokemons(temList);
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
      {console.log("new filtered: ",filteredPokemons)}
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
