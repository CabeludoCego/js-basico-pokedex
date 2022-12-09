const pokeApi = {}

function convertPokeDetailToPokemon(pokeDetails){
	const pokemon = new Pokemon();
	pokemon.number = pokeDetails.order;
	pokemon.name = pokeDetails.name;
	
	const types = pokeDetails.types.map((typeList) => typeList.type.name);
	const [type] = types;
	pokemon.types = types;
	pokemon.type = type; 

	pokemon.photo = pokeDetails.sprites.versions["generation-vi"]["x-y"].front_default;

	return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url).then((response) => response.json())
			.then(convertPokeDetailToPokemon)
}

pokeApi.getPokemons = (offset = 386, limit = 20) => {
	
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return (fetch(url)
		.then( (response) => response.json())
		.then( (jsonBody) => jsonBody.results)
		.then( (pokemons) => pokemons.map( pokeApi.getPokemonDetail ))
		.then( (detailRequests) => Promise.all(detailRequests))
		.then( (pokemonDetails) => pokemonDetails )

	)}

// Promise.all([
// 	fetch('https://pokeapi.co/api/v2/pokemon/2'),
// 	fetch('https://pokeapi.co/api/v2/pokemon/3'),
// 	fetch('https://pokeapi.co/api/v2/pokemon/4'),
// ]).then((results) => {
// 	console.log(results);
// });
