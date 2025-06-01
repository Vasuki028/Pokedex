import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){ //this file is for react-router , opens a page of details 

       const {id} = useParams();
       const [pokemon , setpokemon] = useState({});
       async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data);
        setpokemon({
            name :  response.data.name,
            image : response.data.sprites.other.dream_world.front_default , 
            weight : response.data.weight ,
            height : response.data.height ,
            types : response.data.types.map((t)=> t.type.name)
        })
       }

       useEffect(()=>{
        downloadPokemon();
       },[]);
       return (
        <div className = " pokemon-details-wrapper">
            <img className="pokemon-image" src = {pokemon.image}/>
            <div className ="pokemon-name"><span>{pokemon.name}</span></div>
            <div className ="pokemon-height">Height : {pokemon.height}</div>
            <div className ="pokemon-height"> Weight : {pokemon.weight} </div>
            <div className ="pokemon-types">
                {pokemon.types?.map((t) => (
            <div key={t}>{t}</div>
            ))}
            </div>
        </div>

       );
       
}
export default PokemonDetails;