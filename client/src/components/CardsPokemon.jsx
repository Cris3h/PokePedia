import React from "react";
import { Link } from 'react-router-dom'
import '../styles/CardsPokemon.css'
import carlito from '../images/pokeDefault.jpg'

export const CardsPokemon = ({ id, name, img, type }) => {
    const imgPoke = img ? img : carlito
    return (
        <div className='card-container'>
            <div className="img-container">
            <Link to={`/home/${id}`}>
                <img className='image' src={imgPoke} alt={name}/>
            </Link>
            </div>
            <div className='description'>
                <h2>{name}</h2>
                <h3>Type/s: { type?.map((types, index)=>  (<p key={index}>{types + ' ' }</p>))}</h3>
            </div>

        </div>
    )
};