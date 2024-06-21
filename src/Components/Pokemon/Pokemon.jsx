import PokemonList from "../PokemonList/PokemonList";
import '../Pokemon/Pokemon.css'
function Pokemon({name,img}){
    return(
        <div className="pokemon-wrapper">
            <div className="pokemon-name">{name}</div>
            <img className="pokemon-image" src={img} alt="" />
        </div>
    );  
}

export default Pokemon;