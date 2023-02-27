import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  filterPokesByTypes,
  filterByPower,
  filterAtoZ,
  filterCreater,
  getAllTypes,
} from "../store/actions";
import { useEffect } from "react";

import '../styles/filters.css'

const Filters = ({pages}) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const type = useSelector((state) => state.allTypes);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleFilterTypes = (e) => {
    dispatch(filterPokesByTypes(e.target.value));
  };

  const handlePower = (e) => {
    dispatch(filterByPower(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
  };

  const hadleAlphabet = (e) => {
    dispatch(filterAtoZ(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreater(e.target.value));
  };
  console.log('filters', pages)
  return (
    <div className="filter-main-container">
      <span className="filter-container">
        <div className="types-container">
          <select className="select" onChange={(e) => handleFilterTypes(e)}>
            <option disable>FILTER BY TYPES</option>
            <option value="all">all</option>
            <option value="normal">normal</option>
            <option value="fighting">fighting</option>
            <option value="flying">flying</option>
            <option value="poison">poison</option>
            <option value="ground">ground</option>
            <option value="rock">rock</option>
            <option value="bug">bug</option>
            <option value="ghost">ghost</option>
            <option value="steel">steel</option>
            <option value="fire">fire</option>
            <option value="water">water</option>
            <option value="grass">grass</option>
            <option value="electric">electric</option>
            <option value="psychic">psychic</option>
            <option value="ice">ice</option>
            <option value="dragon">dragon</option>
            <option value="dark">dark</option>
            <option value="fairy">fairy</option>
            <option value="unknown">unknown</option>
            <option value="shadow">shadow</option>
          </select>
        </div>
        <div className="origin-container">
          <select className="select" onChange={(e) => handleFilterCreated(e)}>
            <option disabled>FILTER CREATED</option>
            <option value="all">All Pokemons</option>
            <option value="database">Created</option>
            <option value="api">Originals</option>
          </select>
        </div>

        <div className="power-order-container">
          <select className="select" onChange={(e) => handlePower(e)}>
            <option disabled>ORDER BY POWER</option>
            <option value="arrLtH">less attack power</option>
            <option value="attHtL">more attack power</option>
          </select>
        </div>

        <div className="alph-order-container">
          <select className="select" onChange={(e) => hadleAlphabet(e)}>
            <option disabled>ORDER BY ALPHABET</option>
            <option value="A-Z">order A to Z</option>
            <option value="Z-A">order Z to A</option>
          </select>
        </div>
      </span>
    </div>
  );
};

export default Filters;
