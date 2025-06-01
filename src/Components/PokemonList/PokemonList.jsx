import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {


    const [pokemonList , setPokemonList] = useState([]);
    const [isLoading , setIsloading] = useState(true);

    const [pokedexUrl , setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon'); //this downloads the list of pokemons 

    const [nextUrl , setnextUrl] = useState('');
    const [prevUrl , setprevUrl] =useState('');



    useEffect(() => {
        async function downloadpokemon() {
            setIsloading(false);
            const response = await axios.get(pokedexUrl);
            const pokemonResults = response.data.results; // we are getting the awway of pokemons from result
            // iterating over the array of pokemons and using thier url  , to create an array of
            //that will download those 20 pokemons
            console.log(response.data);
            setnextUrl(response.data.next);
            setprevUrl(response.data.previous);

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
    }, [pokedexUrl]);

    return (
        <>
        <div className="wrapper">
       
            <div className="yellapokemons"> 
           
            {(isLoading) ? 'loading...': 
            pokemonList.map((p) => <Pokemon name={p.name}image ={p.image} key={p.id} id={p.id}/>)
            }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={()=>setpokedexUrl(prevUrl)}> Prev </button>
                <button disabled={nextUrl == null} onClick={()=>setpokedexUrl(nextUrl)}> Next  </button>
            </div>
        
        </div>
        </>

    
    );
}

export default PokemonList;
