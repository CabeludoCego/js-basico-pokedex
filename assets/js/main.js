
const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementById('loadMoreButton');
const limit = 20; let offset = 386;
const maxRecords = 700;

function convertPokeToHTML(pokemon) {
	return `
		<li class="pokemon ${pokemon.type}">
			<span class="number">${pokemon.number}</span>
			<span class="name">${pokemon.name}</span>
			<div class="detail">
				<ol class="types">
					${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
				</ol>

				<img src="${pokemon.photo}"
					alt="${pokemon.name}">
			</div>
		</li>
	`
}

function loadPokemons(offset,limit){
	
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokeToHTML).join('');
		pokemonList.innerHTML += newHtml;	
	})
	
}

loadPokemons(offset,limit);

loadMoreButton.addEventListener('click', () => {
	offset += limit;
	const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

// pokeApi.getPokemons().then((pokemons = []) => {

// 	const newHtml = pokemons.map(convertPokeToHTML).join('');
// 	pokemonList.innerHTML = newHtml;	

// 	// const newList = pokemons.map( (item) => convertPokeToHTML(item) )
// 	// const newHtml = newList.join('');
// 	// pokemonList.innerHTML += newHtml;

// 	// pokemonList.innerHTML += pokemons.map(convertPokeToHTML).join('');
// 	// Faz as operações acima: map, junta com join, e une ao html.



// 	// for (let i = 0; i < pokemons.length; i++) {
// 	// 	const pokemon = pokemons[i];
// 	// 	listItems.push(convertPokeToHTML(pokemon));
// 	// 	// pokemonList.innerHTML += `<li>texto</li>`;
// 	// }
// 	// pokemonList.innerHTML += listItems;
		
// })	
