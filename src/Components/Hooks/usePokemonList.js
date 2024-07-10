import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList(url) {
    const [pokemonListStates, setPokemonListStates] = useState({
        ListOfPokemons: [],
        isDownloading: true,
        PokedexUrl: url,
        nextUrl: "",
        prevUrl: ""
    });

    async function getResponse() {
        setPokemonListStates({ ...pokemonListStates, isDownloading: true });

        try {
            const response = await axios.get(pokemonListStates.PokedexUrl);
            console.log("response: ", response);
            
            const pokemonResults = response.data.results;
            setPokemonListStates((states) => ({
                ...states,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));
            
            const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            const fin_data = await axios.all(pokemonResultsPromise);

            const res = fin_data.map((pokemon) => {
                const pokeData = pokemon.data;
                return {
                    id: pokeData.id,
                    name: pokeData.name,
                    img: pokeData.sprites.other?.dream_world?.front_default || pokeData.sprites.front_shiny,
                    types: pokeData.types
                };
            });

            setPokemonListStates(prevState => ({
                ...prevState,
                ListOfPokemons: res,
                isDownloading: false,
            }));
        } catch (error) {
            console.error("Error fetching Pokémon data: ", error);
            setPokemonListStates((prevState) => ({
                ...prevState,
                isDownloading: false,
            }));
        }
    }

    useEffect(() => {
        getResponse();
    }, [pokemonListStates.PokedexUrl]);

    console.log("Pokemon List States:", pokemonListStates);

    return { pokemonListStates, setPokemonListStates };
}

export default usePokemonList;
