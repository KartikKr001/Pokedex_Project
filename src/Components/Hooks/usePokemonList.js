import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function usePokemonList(url){
    // const [ListOfPokemons,setListOfPokemons] = useState([]);
    // const [isDownloadinsetPokemonListStates.g,SetDownloading] = useState(true);
    // const [PokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    
    // const [nextUrl,setNextUrl] = useState('');
    // const [prevUrl,setPrevUrl] = useState('');

    const [pokemonListStates,setPokemonListStates] = useState({
        ListOfPokemons:[],
        isDownloading:true,
        PokedexUrl:url,
        nextUrl:"",
        prevUrl:""
    });

    async function getResponse(){
        // setDownloading(true)

        // OR
        setPokemonListStates({...pokemonListStates,isDownloading:true});
        
        const response = await axios.get(pokemonListStates.PokedexUrl);
        console.log("response: ",response);
        // array of 20 pokemons
        const pokemonResults = response.data.results;
        
        /*setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);*/
        setPokemonListStates((states)=>({
            ...states,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }));
        
        // iterating array of pokemons ,and using their url to create array of promises
        const pokemonResultsPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        
        // passing all these to axios.all
        const fin_data = await axios.all(pokemonResultsPromise);
        // iterate on each pokemon,extract id ,name,image,,types
        const res = fin_data.map((pokemon)=>{
            const pokeData = pokemon.data;
            return {
                id:pokeData.id,
                name:pokeData.name,
                img:(pokeData.sprites.other) ? pokeData.sprites.other.dream_world.front_default:pokeData.sprites.front_shiny,
                types:pokeData.types
            }
        });
         
        // setListOfPokemons(res);
        // SetDownloading(false);
        setPokemonListStates(prevState => ({
            ...prevState,
            ListOfPokemons: res,
            isDownloading: false,
        }));
    }

    useEffect(()=>{
        getResponse();
    },[pokemonListStates.PokedexUrl]);
    console.log("a",pokemonListStates)
    return {pokemonListStates,setPokemonListStates};

    /*

    const [x,setX] = useState(0);
    const [y,setY] = useState(0);

    useEffect(()=>{
        console.log("re-rendering");
       - ->   this array contains variables when those are changed , this function is re-rendered(if no array given function executed every time.   If empty arr given function executed 1 time only)
       | 
    },[x]);

    */
}

export default usePokemonList;