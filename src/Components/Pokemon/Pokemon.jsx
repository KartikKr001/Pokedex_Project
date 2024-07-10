import '../Pokemon/Pokemon.css'
import { Link } from "react-router-dom";
function Pokemon({name,img,id}){
    return(
    <>
        <div className="pokemon-wrapper">
            <Link to={`/pokemon/${id}`}>
                <div className="pokemon-name">{name}</div>
                <img className="pokemon-image" src={img} alt=""/>
            </Link>
        </div>
    </>
    );  
}

export default Pokemon;