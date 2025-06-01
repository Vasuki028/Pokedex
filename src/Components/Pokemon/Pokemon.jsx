import './Pokemon.css'
function Pokemon({name , image}){
    return(
        <div className = "Pokemon">
            <div className = "nameguru">{name}</div>
            <div ><img className = "imageguru" src={image}/></div>
        </div>
    )
}
export default Pokemon;