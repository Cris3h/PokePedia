import React from "react";
import  '../styles/Paginado.css'


const Paginado = ({ pokePerPage, allPokes, pages }) => {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(allPokes / pokePerPage); i++) {
        pageNumbers.push(i)
    } //de aca sale la cantidad de paginas que va a necesitar

    return (
        <nav>
            <span className='paginado'>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <div className='li' key={number}>
                            <button className='button' onClick={() => pages(number)}>{number}</button>
                        </div>
                    ))
                }
            </span>
        </nav>
    )
}

export default Paginado