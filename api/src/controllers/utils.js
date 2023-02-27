//apiControllers acá
const  axios  = require('axios');

 const mapDetails = (resp) => {
        return resp.map(poke => axios.get(`${poke.url}`))
    }

const fillDataBase = async () => {
    const apiCall = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=5')
    // console.log('esto es apiCall ---> ',apiCall)

    const response = apiCall.data.results

    const getDetailsPokemons = await Promise.all(mapDetails(response))

    const detailsMaped = getDetailsPokemons.map(apiPoke=> {
        return {
            id: apiPoke.data.id,
            name: apiPoke.data.name,
            healtpoints: apiPoke.data.stats[0].base_stat,
            attack: apiPoke.data.stats[1].base_stat,
            defense: apiPoke.data.stats[2].base_stat,
            speed: apiPoke.data.stats[5].base_stat,
            height: apiPoke.data.height,
            weight: apiPoke.data.weight,
            type: apiPoke.data.types.map(e => e.type.name),
            image: apiPoke.data.sprites.other.dream_world.front_default
        }
    })
    console.log('esto es detailsMaped --->', detailsMaped);
    return detailsMaped;
};

module.exports = {
    fillDataBase
}