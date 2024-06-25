import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import '../PokemonDetails/PokemonDetails.css'
function PokemonDetails(){
    // fetching id of paticular pokemon
    const {id} = useParams();
    const [pokemon,setPokemon] = useState({});
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response);
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            height:response.data.height,
            weight:response.data.weight,
            types:response.data.types.map((t)=>t.type.name)
        })
    }

    useEffect(()=>{
        downloadPokemon();
    },[]);
    return(
        <div className="final-wrap">
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src ={pokemon.image}/>
            <div className="details-without-image">
                <div className="pokemon-details-name">{pokemon.name}</div>
                <div className="pokemon-details-height">height:{pokemon.height}</div>
                <div className="pokemon-details-weight">weight:{pokemon.weight}</div>
                <div className="pokemon-details-types">
                    {pokemon.types && pokemon.types.map((p)=> <div className={p} key={p}> {p} </div>)}
                </div>
            </div>
        </div>
        </div>
    );

}

export default PokemonDetails;  