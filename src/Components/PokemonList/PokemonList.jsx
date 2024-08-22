import Pokemon from "../Pokemon/Pokemon";
import "../PokemonList/PokemonList.css"
import usePokemonList from "../Hooks/usePokemonList";

function PokemonList() {
    const apiUrl = "https://pokeapi.co/api/v2";
    const {pokemonListStates,setPokemonListStates} = usePokemonList(`${apiUrl}/pokemon`);
    return(
        <>
            <div className="pokemon-list-wrapper">
                <h2 className="pokedex-list-heading">List of Pokemons</h2>
            {/*
                X:{x} <button onClick={()=>setX(x+1)}>Inc</button><br/>
                Y:{y} <button onClick={()=>setY(y+1)}>Inc</button>
            */}            
                <div className="pokemons-name-image">
                    {(pokemonListStates.isDownloading)? "List is being downloaded":
                        pokemonListStates.ListOfPokemons.map((p)=> <Pokemon key={p.id}  name={p.name} img={p.img} id={p.id} types={p.types}/> )
                    }
                </div>
                <div className="button-prev-next">
    
                    <button className="button-prev" disabled={pokemonListStates.prevUrl == null} onClick={()=>setPokemonListStates((states)=>({...states,PokedexUrl:states.prevUrl}))}>prev</button>
                    <button className="button-next" disabled={pokemonListStates.nextUrl == null} onClick={()=>setPokemonListStates((states)=>({...states,PokedexUrl:states.nextUrl}))}>next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList;