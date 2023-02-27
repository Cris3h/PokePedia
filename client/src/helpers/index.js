

export function filterByTypes(allPokemons, payload){
    return payload === 'all'
    ? allPokemons
    : allPokemons.filter((poke)=> poke.type.includes(payload) === true)
}



export function filterNameId(allPokemons, name) {
    const filterId = allPokemons.filter((p) => p.id == name);
    const filterName = allPokemons.filter((p) => p.name.toLowerCase() === name.toLowerCase())
    const pokesFiltered = filterId.concat(filterName)
    return pokesFiltered
        ? pokesFiltered
        : []
}




export function filterByPower(allpokemons, payload) {
    const order = [...allpokemons]
    return payload === 'attHtL'
        ? powerLowerToHigher(order)
        : powerHigherToLower(order)
}

const powerHigherToLower = (payload) => {
    const order = payload.sort((a, b) => {
        if (a.attack > b.attack) return 1
        if (a.attack < b.attack) return -1
        return 0
    })
    return order
};

const powerLowerToHigher = (payload) => {
    const order = payload.sort((a, b) => {
        if (a.attack < b.attack) return 1
        if (a.attack > b.attack) return -1
        return 0
    })
    return order
}


const aToZ = (payload) => {   
    return payload.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        return 0
    })
}

const zToA = (payload) => {
    return payload.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
        return 0
    })
}
export function filterAlphabet(allPokemons, payload) {
    const order = [...allPokemons];
    return payload === 'A-Z'
        ? aToZ(order)
        : zToA(order)
};








// export function filterDbOrApi (allPokemons, payload){
//     const db = allPokemons.filter((p) => p.dbPokemon === true);
//     const api = allPokemons.filter((p) =>p.dbPokemon === false);

//     if(payload === 'all') return allPokemons
//     if(payload === 'database') return db
//     if(payload === 'api') return api
// };






// export function filterByTypes(allPokemons, payload){
//     return payload = 'all'
//     ? allPokemons
//     : allPokemons.filter(e => e.type.map(e=> e.type).includes(payload))
// }








// export function filterByTypes(pokemons, allPokemons, type) {
//     console.log('CL de filter by types redu --> ', type)
//     console.log('CL de filter by types redu --> ', pokemons)
//     console.log('CL de filter by types redu --> ', allPokemons)
//     return type === 'all' 
//     ? allPokemons
//     : pokemons.filter((poke) => poke.type.includes(type) === true)
// };