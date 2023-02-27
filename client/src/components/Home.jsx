import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllPokemon, getAllTypes } from "../store/actions";
import { CardsPokemon } from "./CardsPokemon";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import Paginado from "./Paginado";
import "../styles/Home.css";

const Home = () => {
  const allPokes = useSelector((state) => state.pokemons); // === mapStateToProps
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const pagePokemon = allPokes.slice(indexOfFirstPoke, indexOfLastPoke);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(getAllPokemon());
    setCurrentPage(1);
  };

  return (
    <div className="home-main-container">


      {/* nav-bar */}
      <div className="nav-bar">
        <div className="search-bar" setCurrentPage={setCurrentPage}>
          <SearchBar 
          pages={setCurrentPage}
          />
        </div>

        <div className="btn-container">
        <button className="btn" onClick={(e) => handleOnClick(e)}>
          RESET
        </button>
        <a className="btn" href="/create">CREATE</a>
        </div>
      
      </div>


      {/* intermedian slot */}
      <div className="filters-container">
        <Filters 
        pages={setCurrentPage}
        />
      </div>


          {/* pages */}
      <div className="pages-container">
        <Paginado
          
          pokePerPage={pokePerPage}
          allPokes={allPokes.length}
          pages={pages}
        />
      </div>


      {/* cards */}
      <div className="cards-container">
        {pagePokemon?.map((el, index) => {
          return (
            <div className="single-card" key={index}>
              {/* // <Link to={`/pokemon/${el.id}`} key={index}> */}
              <CardsPokemon
                id={el.id}
                name={el.name}
                img={el.img}
                type={el.type}
              />
              {/* </Link> */}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Home;
