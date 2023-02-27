import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { getAllPokemon } from '../store/actions';
import SearchBar from "./SearchBar";
import "../styles/PokemonDetail.css";

function PokemonDetail() {
  const [poke, setPoke] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/pokemon/${id}`).then((r) => {
      setPoke(r.data);
    });
  }, [id]);

  // const handlerOnClick = (e) => {
  //     e.preventDefault();
  //     dispatch(getAllPokemon(e))
  // }

  console.log("ea -->  ", window.location.pathname);

  return poke ? (
    <div className="detail-main-container">
     
      {/* SEARCH BAR */}
      <div className="nav-bar">
        <div className="search-bar">
          {/* <SearchBar /> */}
        </div>

        <div className="btn-container">
          <a className="btn" href="/home" >
            RETURN
          </a>
          <a className="btn" href="/create">
            CREATE
          </a>
        </div>
      </div>

    {/* CARD DETAIL */}
      <div className="detail-card-container">

        {/* IMG */}
        <div className="detail-img-container">
          <img className="detail-img" src={poke.img} alt="not found" />
        </div>


        {/* INFO */}
        <div className='detail-data-container'>

        {/* NAME */}
        <div className="data-container">
          <p>Name: <b>{poke.name}</b></p>
        </div>

            <div className="data-container">
              <p>Attack power: <b>{poke.attack}</b></p>
            </div>

            <div className="data-container">
              <p>Defense power: <b>{poke.defense}</b></p>
            </div>

            <div className="data-container">
              <p>Speed: <b>{poke.speed}</b></p>
            </div>

            <div className="data-container">
              <p>
                Health Points:
                {" "}
                <b>
                {poke.healtpoints
                  ? poke.healtpoints
                  : "the Health points of this pokemon is still unknown"}
                  </b>
              </p>
            </div>

            <div className="data-container">
              <p>Height: <b>{poke.height}</b></p>
            </div>

            <div className="data-container">
              <p>Weight: <b>{poke.weight}</b></p>
            </div>

            <div className="data-container">
              <p>
                type:{" "}
                <b>
                {poke?.type instanceof Array
                  ? poke?.type.map((e) => e).join(", ")
                  : poke?.type
                  ? poke?.type
                  : "the types of this pokemon is still unknown"}
                 </b> 
              </p>
            </div>

        </div>
      </div>
    </div>
  ) : (
    <h1> CHARGING... </h1>
  );
}

export default PokemonDetail;
