
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities;    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)    
    const [type] = types
    
    const baseStats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)    
    const [baseStat] = baseStats
    
    const statNames = pokeDetail.stats.map((statSlot) => statSlot.stat.name)    
    const [statName] = statNames

    pokemon.types = types
    pokemon.type = type

    pokemon.abilites = abilities
    pokemon.ability = ability

    pokemon.statStats = baseStats
    pokemon.statStat = baseStat

    pokemon.statNames = statNames
    pokemon.statName = statName
   
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default    

    console.log(pokeDetail.stats,0)

    console.log(pokemon.baseStats)
    console.log(pokemon.abilites)
    console.log(pokemon.baseStat)
    console.log(pokemon.statNames)
    console.log(pokemon.ability)
    console.log(pokemon.statName)
    
    return pokemon
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
