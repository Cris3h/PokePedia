const express = require('express');
const router = express.Router()

const {
    typeController,
} = require('../../controllers/pokemonsTypes')

router.get('/',getTypes)

module.exports = router