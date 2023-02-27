import {
    filterByTypes,
    // filterDbOrApi,
    filterByPower,
    filterAlphabet
} from '../../helpers'

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemons: [],
    detail: []

}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POKEMON':
            console.log('console.log de GET_ALL_POKEMON',action.payload)
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload
            }
        case 'GET_POKEMON_BY_ID': {
            return {
                ...state,
                detail: [action.payload]
            }
        }
        case 'GET_ALL_TYPES':
            return {
                ...state,
                allTypes: action.payload
            }
        // case 'FILTER_BY_TYPES':
        //     return {
        //         ...state,
        //         pokemons: filterByTypes(state.pokemons, state.allPokemons, action.payload)
        //     }
        case 'FILTER_BY_TYPES':
            return {
                ...state,
                pokemons: filterByTypes(state.allPokemons, action.payload)
            }
        // case 'FILTER_BY_TYPES':
        //     const types = state.allPokemons;
        //     const pokesFilter = action.payload === 'all' 
        //     ? types
        //     : types.filter(e => e.types.includes(action.payload))
        //     console.log('CL de filter by types redu --> ',action.payload)
        //     console.log('CL de filter by types redu --> ', pokesFilter)
        //     console.log('CL de filter by types redu --> ', types)
        //     return {
        //         ...state,
        //         pokemons: pokesFilter
        //     }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'FILTER_BY_POWER':
            console.log(action.payload)
            return{
                ...state,
                pokemons: filterByPower(state.allPokemons, action.payload)
            }
        case 'FILTER_BY_ALPHAB':
            return {
                ...state,
                pokemons: filterAlphabet(state.allPokemons, action.payload)
            }
            case'GET_POKE_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
            case 'FILTER_CREATED':
                const allPokes = state.allPokemons;
                // console.log('cLo de FILTER_CREATED', allPokes.dbPokemon)
                const creationFilter = action.payload === 'database' 
                ? allPokes.filter(e=>  e.dbPokemon === true) 
                : allPokes.filter(e =>  e.dbPokemon === false)
                return{
                    ...state,
                    pokemons: action.payload === 'all' 
                    ? state.allPokemons 
                    : creationFilter
                }

            case 'POST_POKEMON':
                console.log('action.payload de POST_POKEMON -->',action.payload)
                    return {
                        ...state,
                        pokemons:[...state.pokemons, action.payload]
                    }
                    
        default: return state
    }

};


export default reducer;



        // case 'FILTER_BY_POWER':
        //     let orderAttack = action.payload === 'attLtH'
        //         ? state.pokemons.sort(function (a, b) {
        //             if (a.attack > b.attack) return 1
        //             if (a.attack < b.attack) return -1
        //             return 0
        //         })
        //         :
        //         state.pokemons.sort(function (a, b) {
        //             if (a.attack < b.attack) return 1
        //             if (a.attack > b.attack) return -1
        //             return 0
        //         })
        //     return {
        //         ...state,
        //         pokemons: orderAttack
        //     }



                // case 'FILTER_BY_TYPES':
        //     const types = state.allPokemons
        //     const filteredTypes = action.payload === 'all' 
        //     ? types 
        //     : types.filter(e => e.types.includes(action.payload))
        //     return {
        //         ...state,
        //         pokemons: filteredTypes
        //     }


        // action.payload === 'database' ?
        //         allPokes.filter(e => e.dbPokemon)
        //         :allPokes.filter(e => !e.dbPokemon)










                    // case 'FILTER_CREATED': //UUIDV4
            //     const allPokes = state.allPokemons;
            //     console.log('cLo de FILTER_CREATED', allPokes.id)
            //     const dbFilter = action.payload === 'database' 
            //     ? allPokes.filter(e=> typeof e.id === 'string') 
            //     : allPokes.filter(e => typeof e.id === 'number')
            //     return{
            //         ...state,
            //         pokemons: action.payload === 'all' 
            //         ? state.allPokemons 
            //         : dbFilter
            //     }




                  // case 'FILTER_BY_CREATED':
        //     return {
        //         ...state,
        //         pokemons: filterDbOrApi(state.allPokemons, action.payload)
        //     }