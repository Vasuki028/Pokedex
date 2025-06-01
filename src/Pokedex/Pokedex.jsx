import Search from "../Components/Search/Search";
import './Pokedex.css';
import PokemonList from "../Components/PokemonList/PokemonList";
function Pokedex() {
return(
<div className="Pokedex-wrapper">
{/* <h1 id = "heading"> Pokedex </h1> */}
<Search/>
<PokemonList/>
</div>
)
}
export default Pokedex;