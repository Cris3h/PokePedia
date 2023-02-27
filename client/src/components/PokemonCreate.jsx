import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getAllTypes } from "../store/actions";
import '../styles/create.css'

import SearchBar from "./SearchBar";

function validations(input) {
  let errors = {};

  if (!input.name) errors.name = "name is mandatory! please choose one.";
  if (input.name.length > 15)
    errors.name = "the pokemon name is too long, please choose another one";
  if (!/^[a-zA-Z]+$/.test(input.name))
    errors.name = "do not use special symbols!";
  if (
    input.name.includes(0) ||
    input.name.includes(1) ||
    input.name.includes(2) ||
    input.name.includes(3) ||
    input.name.includes(4) ||
    input.name.includes(5) ||
    input.name.includes(6) ||
    input.name.includes(7) ||
    input.name.includes(8) ||
    input.name.includes(9)
  ) {
    errors.name = "do not include numbers on the name!";
  }

  if (!input.healtpoints)
    errors.healtpoints = "choose the health points between 10 - 250!";
  if (input.healtpoints > 250)
    errors.healtpoints = "pick between 10 - 250 points!";
  if (input.healtpoints <= 9)
    errors.healtpoints = "pick between 10 - 250 points!";

  if (!input.attack)
    errors.attack = "choose between 10 - 250 points of attack!";
  if (input.attack > 250)
    errors.attack =
      "make a competitive pokemon!, choose between 10 - 250 points of attack!";
  if (input.attack <= 9)
    errors.attack =
      "your pokemon will be too weak!, choose between 10 - 250 points of attack!";

  if (!input.defense)
    errors.defense = "choose between 10 - 150 points of defense!";
  if (input.defense > 150)
    errors.defense =
      "make a competitive pokemon! choose between 10 - 150 points of defense!";
  if (input.defense <= 9)
    errors.defense =
      "make a competitive pokemon! choose between 10 - 150 points of defense!";

  if (!input.speed) errors.speed = "choose between 10 - 120 points of speed!";
  if (input.speed > 120)
    errors.speed =
      "make a competitive pokemon! choose between 10 - 120 points of speed!";
  if (input.speed <= 9)
    errors.speed =
      "make a competitive pokemon! choose between 10 - 120 points of speed!";

  if (!input.height) errors.height = "choose between 1 - 15 meters!";
  if (input.height >= 16) errors.height = "choose between 1 - 15 meters!";
  if (input.height < 1) errors.height = "choose between 1 - 15 meters!";

  if (!input.weight) errors.weight = "choose between 1kg to 1000kgs!";
  if (input.weight < 1) errors.weight = "choose between 1kg to 1000kgs!";
  if (input.weight > 1000) errors.weight = "choose between 1kg to 1000kgs!";

  if (!input.type) errors.type = "please choose between 1 to 3 types of power!";
  if (input.type.length > 3)
    errors.type = "please choose between 1 to 3 types of power!";

  if (!input.img)
    errors.img = "please paste a link so your pokemon has a picture!";

  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { allTypes, pokemons } = useSelector((state) => state);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    healtpoints: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
    img: "",
  });

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    const allPokes = pokemons.map((e) => e.name);
    if (!allPokes.includes(e.target.value)) {
      setInput({
        ...input,
        [e.target.name]: e.target.value, //a medida que carga va llenando el estado de input con el value del input.
      });
      console.log("console.log del estado input --> ", input);
      setErrors(
        validations({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSelect = (e) => {
    if (!input.type.includes(e.target.value)) {
      setInput({
        ...input,
        type: [...input.type, e.target.value],
      });
      setErrors(
        validations({
          ...input,
          type: [...input.type, e.target.value],
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.name ||
      errors.healtpoints ||
      errors.attack ||
      errors.defense ||
      errors.speed ||
      errors.height ||
      errors.weight ||
      errors.type ||
      !input.name
    ) {
      alert("creation failed!, please complete the stats.");
    } else {
      dispatch(postPokemon(input));
      alert("Pokemon created!");
      setInput({
        name: "",
        healtpoints: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: [],
        img: "",
      });
      history.push("/pokemon");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      type: input.type.filter((inputType) => inputType !== e),
    });
    setErrors(
      validations({
        ...input,
        type: input.type.filter((inputType) => inputType !== e),
      })
    );
  };

  return (
    <div className="create-main-container">

      {/* SEARCH BAR */}
      <div className="nav-bar">
        <div className="search-bar">
          {/* <SearchBar /> */}
        </div>

        <div className="btn-container">
          <a className="btn" href="/home">
            TO HOME
          </a>
        </div>
      </div>

      {/* FORM */}
      <div className="create-title">
      <h1>Create a new pokemon</h1>
      </div>

      <div className="input-container">

      <form className="form-create" onSubmit={(e) => handleSubmit(e)}>

        <div className="input-form-name">
          <label className="label-form-create">Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="input-error-name">{errors.name}</p>}
        </div>

        <div className="input-form-healthpoints">
          <label className="label-form-create">health points: </label>
          <input
            type="number"
            value={input.healtpoints}
            name="healtpoints"
            onChange={(e) => handleChange(e)}
          />
          {errors.healtpoints && <p className="input-error-healthpoints">{errors.healtpoints}</p>}
        </div>

        <div className="input-form-attack">
          <label className="label-form-create">attack: </label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
          {errors.attack && <p className="input-error-attack">{errors.attack}</p>}
        </div>

        <div className="input-form-defense">
        <label className="label-form-create">defense: </label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          {errors.defense && <p className="input-error-defense">{errors.defense}</p>}
        </div>

        <div className="input-form-speed">
        <label className="label-form-create">speed: </label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          {errors.speed && <p className="input-error-speed">{errors.speed}</p>}
        </div>

        <div className="input-form-image">
        <label className="label-form-create">image: </label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          />
          {errors.img && <p className="input-error-image">{errors.img}</p>}
        </div>

        <div className="input-form-height">
        <label className="label-form-create">height: </label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {errors.height && <p className="input-error-height">{errors.height}</p>}
        </div>

        <div className="input-form-weight">
        <label className="label-form-create">weight: </label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight && <p className="input-error-weight">{errors.weight}</p>}
        </div>
        <div className="input-form-types">
          <select onChange={(e) => handleSelect(e)}>
            {allTypes.map((e) => (
              <option value={e.type}>{e.type}</option>
            ))}
          </select>
        </div>
        

      </form>
      {input.type.map((e) => (
        <div className="container-types-chosen">
          <p className="input-error-types">{e}</p>
          <button className="btn-create-types-close" onClick={() => handleDelete(e)}>x</button>
          {errors.type && <p className="error-types">{errors.type}</p>}
        </div>
      ))}
      </div>
        <div className="btn-container">
          <button className="btn-create" type="submit" onClick={(e)=> handleSubmit(e)}>create</button>
        </div>
    </div>
  );
}
