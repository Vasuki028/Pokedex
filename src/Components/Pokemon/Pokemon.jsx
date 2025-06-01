import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name , image , id}){
    return(
        <div className = "Pokemon">
            <Link to={`/pokemon/${id}`}>
            <div className = "nameguru">{name}</div>
            <div ><img className = "imageguru" src={image}/></div>
            </Link>
        </div>
    )
}
export default Pokemon;