const  axios  = require('axios');
const { apiURL } = require('../utils')
const { fillDataBase } = require('./utils')
const { Pokemon, Type } = require('../db.js')

const allPokemons = async () => {
    const allPokemons = fillDataBase();

}


const findByName = async () => {
    const allPokemons = fillDataBase();
    console.log('esto es pokemons en findByName',allPokemons)

    const pokemon = await Pokemon
};

const findByPk = () => {};



module.exports = {
    findByName,

}