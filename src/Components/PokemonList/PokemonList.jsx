import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import "../PokemonList/PokemonList.css"

function PokemonList() {
    const [ListOfPokemons,setListOfPokemons] = useState([]);
    const [isDownloading,SetDownloading] = useState(true);
    const [PokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    
    const [nextUrl,setNextUrl] = useState('');
    const [prevUrl,setPrevUrl] = useState('');

    async function getResponse(){
        SetDownloading(true);
        const response = await axios.get(PokedexUrl);
        console.log(response);
        // array of 20 pokemons
        const pokemonResults = response.data.results;

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        
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
         
        console.log(res);
        setListOfPokemons(res);
        SetDownloading(false);
    }

    useEffect(()=>{
        getResponse();
    },[PokedexUrl]);

    /*

    const [x,setX] = useState(0);
    const [y,setY] = useState(0);

    useEffect(()=>{
        console.log("re-rendering");
       - ->   this array contains variables when those are changed , this function is re-rendered(if no array given function executed every time.   If empty arr given function executed 1 time only)
       | 
    },[x]);

    */

    


    return(
        <>
            <div className="pokemon-list-wrapper">
                List of Pokemons
            {/*
                X:{x} <button onClick={()=>setX(x+1)}>Inc</button><br/>
                Y:{y} <button onClick={()=>setY(y+1)}>Inc</button>
            */}            
                <div className="pokemons-name-image">
                    {(isDownloading)? "List is being downloaded":
                        ListOfPokemons.map((p)=> <Pokemon key={p.id}  name={p.name} img={p.img} types={p.types}/> )
                    }
                </div>
                <div className="button-prev-next">
    
                    <button className="button-prev" disabled={prevUrl == null} onClick={()=>setPokedexUrl(prevUrl)}>prev</button>
                    <button className="button-next" disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)}>next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList;