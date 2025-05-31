import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {


    const [pokemonList , setPokemonList] = useState([]);
    const [isLoading , setIsloading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'; //this downloads the list of pokemons 

    useEffect(() => {
        async function downloadpokemon() {
            const response = await axios.get(POKEDEX_URL);
            const pokemonResults = response.data.results; // we are getting the awway of pokemons from result
            // iterating over the array of pokemons and using thier url  , to create an array of
            //that will download those 20 pokemons
            const pokemonResultPromise = pokemonResults.map((pokemons)=>axios.get(pokemons.url));
            //passing the promise array to axios .all
            const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data
            console.log(pokemonData);

            //now iterate on the data of each pokemon , and extract the id , name and image
            const pokelistresult = pokemonData.map((pokeData)=>{
                const pokemon = pokeData.data;
                return {
                    id:pokemon.id,
                    name : pokemon.name ,
                     image :(pokemon.sprites.other) ?  pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                     types : pokemon.types
                    }
            });
            console.log(pokelistresult);
            setPokemonList(pokelistresult);
            setIsloading(false);
        }
        downloadpokemon();
    }, []);

    return (
        <div className="wrapper">
            <div className = "heading"> Pokemon List </div>
            <div className="yellapokemons">
            {(isLoading) ? 'loading...': 
            pokemonList.map((p) => <Pokemon name={p.name}image ={p.image} key={p.id}/>)
            }
            </div>
        </div>
    );
}

export default PokemonList;
