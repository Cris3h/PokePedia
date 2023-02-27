const { Router } = require('express');

//para llenarnos de info:
const { getTypeFromApi } = require('../controllers/typeController/typeController');
const { searchPokemonByName, searchPokemonById, } = require('../controllers/pokemonControllers/pokeController');
const { postPokemon  } = require('../controllers/pokemonControllers/dataController')





const router = Router();


router.get('/pokemon', searchPokemonByName);
router.get('/pokemon/:id', searchPokemonById);
router.get('/type', getTypeFromApi)
router.post('/pokemon', postPokemon)



module.exports = router;
































//const { v4: uuidv4 } = require('uuid');

// const { Pokemon, Type } = require('../db');

// const axios = require('axios')





// router.get('/test', async (req, res)=>{
//     // const request = await getDbDataDos
//     const results = await Pokemon.findAll({
//         include: {
//             model: Type,
//             attributes: ['type'],
//             through: {
//                 attribute: [],
//             },
//         },
//     });
//     res.json(results)
// })



// router.get('/pokemonApi', searchPokemonByName);
// router.get('/pokemonDB', searchPokemonByName);
// router.get('/pokemon/:id', idPokeSearch);