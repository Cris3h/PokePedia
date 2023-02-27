const { apiURL, request } = require("../../utils/config/index");
const axios = require("axios");
const { Pokemon, Type } = require("../../db.js");
const {
  getApiData,
  getDbData,
  allInfo,
  getPokemonById,
} = require("./dataController");

const searchPokemonByName = async (req, res, next) => {
  const { name } = req.query;
  const allData = await allInfo(); //como se trae solamente los primeros 40, si busco por nombre el 41 no está. Por ID hace un llamado a la api con el respectivo ID incluido y por eso si lo trae.
  if (name) {
    const pokeName = await allData.find(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    pokeName
      ? res.status(200).send(pokeName)
      : res.status(400).send(`${name} isn't a Pokemon!, try again please!`);
  } else {
    res.status(200).send(allData);
  }
};



const searchPokemonById = async (req, res, next) => {
  const { id } = req.params;
  if (!id.includes("-")) {
    const pokeData = await getPokemonById(id);
    res.status(200).json(pokeData);
  } else {
    res.status(200).json(await searchPokeIdDB(id));
  }
};



const searchPokeIdDB = async (id) => {
  const dataDB = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attribute: ["type"],
      through: {
        attribute: [],
      },
    },
  });
  console.log("data -----------__>", dataDB.dataValues.types[0].dataValues);
  return {
    id:dataDB.dataValues.id,
    name: dataDB.dataValues.name,
    healtpoints: dataDB.dataValues.healtpoints,
    attack: dataDB.dataValues.attack,
    defense: dataDB.dataValues.defense,
    speed: dataDB.dataValues.speed,
    height: dataDB.dataValues.height,
    weight: dataDB.dataValues.weight,
    img: dataDB.dataValues.img,
    dbPokemon: true,
    type: dataDB.dataValues.types.map((e) => e.dataValues.type),
  };
};



module.exports = {
  searchPokemonByName,
  searchPokemonById,
};

// allIdPokes,
// idPokeSearch

// const idPokeSearch = async (req, res) => {
//     const {id} = req.params
//     let idSearch = await allIdPokes();
//     let data = idSearch.find(e => e.id == id)
//     res.json(data)
// }
