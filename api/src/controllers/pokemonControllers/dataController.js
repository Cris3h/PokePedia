const axios = require('axios')
const { Pokemon, Type } = require('../../db')
const { apiURL, request } = require('../../utils/config/index')


//asegurate de que estas trayendo los datos desde el principio.



//me traigo de la API todos los pokemon con todas sus caracteriscas

const getApiData = async () => {
    const apiData = await axios.get(`${apiURL}${request}`);
    const response = apiData.data.results;
    try {
        const getPoke = (r) => {
            return r.map(p => axios.get(`${p.url}`))
        } //para entrar al key "url" de results
        const getAllPokemon = await Promise.all(getPoke(response))
        // console.log("------------------> ",  response)
        const pokemonInfo = getAllPokemon.map(e => {
            return {
                id: e.data.id,
                name: e.data.name,
                attack: e.data.stats[1].base_stat,
                img: e.data.sprites.other.dream_world.front_default,
                type: e.data.types.map(e => e.type.name),
                dbPokemon: false
            }
        })
        console.log('this is the length of my response.data --> ', pokemonInfo.length)
        return pokemonInfo
    } catch (error) {
        console.error(error)
    };
};

// busco los pokemons en la bd
const getDbData = async () => {
    const results = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['type'],
            through: {
                attributes: [],
            },
        },
    });
    
    const allDbPokemons = results.map(e => ({
        id: e.id,
        name: e.name,
        img: e.img,
        type: e.dataValues.types.map((e) => e.dataValues.type), // ESTO ES UN ARRAY PUTO Y CAGON
        dbPokemon: true,
        attack: e.attack,
    }))
    console.log('log de getDbData', allDbPokemons.type)
    return allDbPokemons
};






// los uno en un mismo resultado
const allInfo = async () => {
    const apiInfo = await getApiData(); //devolver esto en el endpoint /pokemonsAPI
    const dbInfo = await getDbData(); //devolver esto en el endpoint /pokemonsDB
    // const allPokemons = apiInfo.concat(dbInfo);
    const allPokemons = [...apiInfo, ...dbInfo]
    return allPokemons;
};


// const getDbPokeId = async (id) => {
//     try {
//         const dbPoke = await Pokemon.findByPk(id{
//             include: {
//                 model: Type,
//                 attributes: ['type'],
//                 through: {
//                     attribute: [],
//                 },
//             },
//         });

//         console.log('hola rey, estamos en getDbPokeId', dbPoke)

//         let poke = {
//             name: dbPoke.name,
//             healtpoints: dbPoke.healtpoints,
//             attack: dbPoke.attack,
//             defense: dbPoke.defense,
//             speed: dbPoke.speed,
//             height: dbPoke.height,
//             weight: dbPoke.weight,
//             type: dbPoke.type.map((e) => e.type),
//             img: dbPoke.img,
//             dbPokemon: true
//         }
//         return poke
//     }
//     catch (err) {
//         console.log(err)
//     }
// };


const getPokemonById = async (id) => {
    try {
        const apiPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const idPoke = {
            id: apiPoke.data.id,
            name: apiPoke.data.name,
            healtpoints: apiPoke.data.stats[0].base_stat,
            attack: apiPoke.data.stats[1].base_stat,
            defense: apiPoke.data.stats[2].base_stat,
            speed: apiPoke.data.stats[5].base_stat,
            height: apiPoke.data.height,
            weight: apiPoke.data.weight,
            type: apiPoke.data.types.map(e => e.type.name),
            img: apiPoke.data.sprites.other.dream_world.front_default,
            dbPokemon: false
        }
        console.log(idPoke.dbPokemon)
        return idPoke
    } catch (err) {
        console.log(err)
    };
};



const postPokemon = async (req, res) => {
    let { name, healtpoints, attack, defense, speed, height, weight, type, img } = req.body;

    if (!name) return res.json({ Problem: 'name is mandatory! please choose one!' });
    const notNewPoke = await Pokemon.findOne({ where: { name: name } })
    if (notNewPoke) return res.json({ Problem: 'That pokemon already exist!, try another one please!' })

    const newPoke = await Pokemon.create({
        name,
        healtpoints,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
    })

    await Promise.all(type.map(async e => {
        console.log('log types en postpokemon: -->', type)
        await newPoke.addType([
            (await Type.findOrCreate({
                where: {
                    type: e
                }
            }))[0].dataValues.id
        ])
    }))
    const relationalTables = await Pokemon.findOne({
        where: {
            name: name
        },
        include: {
            model: Type,
            attribute: ['name'],
            through: {
                attributes: [],
            }
        }
    })

    res.json({ info: 'Pokemon creation succefuly' })
    return relationalTables;
};


module.exports = {
    getApiData,
    getDbData,
    allInfo,
    getPokemonById,
    postPokemon,
}


    // getDbDataDos,
    // allIdPokes





// const getDbDataDos = async () => {
//     const results = await Pokemon.findAll({
//         include: {
//             model: Type,
//             attributes: ['type'],
//             through: {
//                 attribute: [],
//             },
//         },
//     });
//     const array = [];
//     const allDbPokemons = results.map((e) => {
//         array.push({
//             id: e.id,
//             name: e.name,
//             img: e.img,
//             type: e.type,
//             dbPokemon: true,
//             attack: e.attack,
//         })
//     })
//     console.log(allDbPokemons)
//     return allDbPokemons

// };






//  const getPokemons = (data) => {
//     return data.map (p => axios.get(`${p.url}`))
// };

// const getApiData = async (req, res) => {
//     try{
//         const apiData = await axios.get(`${apiURL}${request}`)
//         const response = apiData.data.results
//         const getAllPokemons = await Promise.all(getPokemons(response));
//         const ediardaLaconchaDeTuMadre =
//         res.send(getAllPokemons.map(pokemon=>{
//             return {
//                         id: pokemon.data.id,
//                         name: pokemon.data.name,
//                         img: pokemon.data.sprites.other.dream_world.front_default,
//                         type: pokemon.data.types.map(e => e.type.name)
//                     }
//         }
//         )
//         );
//         //deberia juntar la info de la BD y de la API

//     }catch(error){
//         console.error(error)
//     }
// };






        // let poke = {
        //     name: dbPoke.name,
        //     healtpoints: dbPoke.dataValues.healtpoints,
        //     attack: dbPoke.dataValues.attack,
        //     defense: dbPoke.dataValues.defense,
        //     speed: dbPoke.dataValues.speed,
        //     height: dbPoke.dataValues.height,
        //     weight: dbPoke.dataValues.weight,
        //     type: dbPoke.dataValues.type.map((e)=> e.dataValues.type),
        //     img: dbPoke.dataValues.img,
        //     dbPokemon: true
        // }




        // const allIdPokes = async (id) => {
//     const dbInfo = await getDbPokeId();
//     const apiInfo = await getPokemonById();
//     // const allInfo = [...dbInfo, ...apiInfo]
//     const allInfo = dbInfo.concat(apiInfo)
//     return allInfo
// };







    // const array = [];
    // const allDbPokemons = results.map((e) => {
    //     array.push({
    //         id: e.id,
    //         name: e.name,
    //         img: e.img,
    //         // type: e.type,
    //         dbPokemon: true,
    //         attack: e.attack,
    //     })
    // })