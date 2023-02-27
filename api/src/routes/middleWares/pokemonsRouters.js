const { Router } = require('express');
const router = Router()

const {
    getByName,
    postPokemon,
    fillDataBase,
} = require('../../controllers/utils')

router.get('/', fillDataBase)
// router.get('/:id', getByName);
// router.post('/post', postPokemon);


module.exports = router