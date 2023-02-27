import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../store/actions/'
import '../styles/searchbar.css'


const SearchBar = () => {
    const [pokemons, setPokemons] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setPokemons(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPokemonByName(pokemons))
        setPokemons('')
    };



    return (
        <div className='main-container-searchbar'>
            <input 
            type="text"
            className='input-searchbar'
            placeholder='search...'
            value={pokemons} onChange={(e) => handleSearch(e)}
             />
             <button className='btn-searchbar' type='submit' onClick={(e) => handleSubmit(e)}>search</button>
        </div>
    )
};

export default SearchBar;