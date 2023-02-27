const { Type } = require('../../db');
const axios = require('axios');


const getTypeFromApi = async (req, res) => {

    try {
        const requestForTypes = await axios.get("https://pokeapi.co/api/v2/type");
        const types = requestForTypes.data.results.map((e) => e.name);
        types.forEach(e => {
            Type.findOrCreate({
                where: { type: e }
            })
        })
        console.log('getTypes from api --->', types)
        const typesDb = await Type.findAll();
        res.send(typesDb)
    } 
    
    catch (error) {
        console.error(error)
    }
    ;
}

// try {
//     const typePokemon = (await axios('https://pokeapi.co/api/v2/type')).data.results
//     const dataTypes = typePokemon.map(e => e.name)
//     dataTypes.forEach(e => {
//         Type.findOrCreate({
//             where: { name: e }
//         })
//     })
//     const typeDb = await Type.findAll()
//     res.send(typeDb)
// } catch (error) {
//     res.status(404).json({ error })
// }

//acá inicializo la base de datos con los types cargados.
// const typesApi = async () => {
//     results = [];
//     try {
//         const call = await axios.get("https://pokeapi.co/api/v2/type")
//         const response = call.data.results.map((e) =>
//             results.push({
//                 type: e.name
//             })
//         )
//         await Type.bulkCreate(results)
//         const types = await Type.findAll()
//         console.log('ESTO ES TYPES DE API --> ', types)
//         return types

//     } catch (e) { 
//         console.error(e)
//     }
// }

module.exports = {
    getTypeFromApi,
    // typesApi
}