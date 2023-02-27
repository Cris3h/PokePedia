import axios from 'axios';


export const getAllPokemon = () => async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemon`);
    return dispatch({
        type: "GET_ALL_POKEMON",
        payload: response.data
    })
};

export const getPokemonByName = (name) => async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemon?name=${name}`)

    return dispatch({
        type: 'GET_POKEMON_BY_NAME',
        payload: [response.data]
    })
};

export const getAllTypes = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/type")
        return dispatch({
            type: 'GET_ALL_TYPES',
            payload: response.data
        })
    }
};

export const getPokemonById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/:${id}`)
        return dispatch({
            type: 'GET_POKEMON_BY_ID',
            payload: response.data
        })
    } catch (e) {
        alert(`the pokemon is not available! try another one please`)
    }
};

//------------------------- FILTERS -----------------------------------


export const filterPokesByTypes = (payload) => {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
};


//------------------------- ORDERS --------------------------------------
export const filterByPower = (payload) => {
    return {
        type: 'FILTER_BY_POWER',
        payload
    };
};

export const filterAtoZ = (payload) => {
    return {
        type: 'FILTER_BY_ALPHAB',
        payload
    }
};


export const filterCreater = (payload)=>{
    return{
        type: 'FILTER_CREATED',
        payload
    }
};


export const postPokemon = (payload)=>{
    return async function(){
        // console.log('payload de post pokemon -->',payload)
        const response = await axios.post(`http://localhost:3001/pokemon`, payload)
        // console.log('response de .post en actions -->',response)
        return response
    }
}
