const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="stats">
            <span class="status">Detailed Status</span>
            <ol class="statsName">
             ${pokemon.stats.map((stat) => `<li class="statName">${stat}: </li>`).join('')}  
            </ol>      
            <ol class="statsNum"> 
             ${pokemon.statsNum.map((stat) => `<li class="statNum" style=  "width: ${stat}%">${stat}</li>`).join('')}   
            </ol>
            <span class="attackName">Abilities</span>
            <ol class="abilitiesName">
             ${pokemon.abilities.map((ability) => `<li class="abilityName">${ability}</li>`).join('')}  
            </ol>      
            
            </div>
        </li>        
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
