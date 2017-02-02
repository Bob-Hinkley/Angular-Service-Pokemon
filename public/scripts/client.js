var app = angular.module('pokeApp', []);

app.controller('PokemonController', function(PokeService){ //http no longer needed in function
  console.log('PokemonController loaded');  //injecting PokeService into function



  var ctrl = this;
  var currentlySelectedPokemon = {};

  ctrl.pokemonList = [{name: 'Squirtle'},
                      {name: 'Bulbasaur'},
                      {name: 'Charmander'},
                      {name: 'Pikachu'}
                     ];

ctrl.currentPokemon = {};

  // $http.get(API + '/pokemon').then(function(response){
  //   console.log('Got a response from the API', response);
  //   ctrl.pokemonList = response.data.results;
  // }).catch(function(err){
  //   console.log('Error getting info from API', err);
  // });

PokeService.getAllPokemon().then(function (pokeList){  //calling PokeService, calling function AllPokemon, which returns promise
  ctrl.pokemonList = pokeList;  // equals an array
})

  ctrl.iChooseYou = function(pokemon){ //passing in pokemon object in array.
    console.log('Chose', pokemon);
    PokeService.getPokemon(pokemon).then(function(imageUrl){  //getting back some sort of imageURL
      togglePokemon(pokemon)
      ctrl.currentPokemon.imageUrl = imageUrl;   //call pokemon server url from line above
      ctrl.currentPokemon.name = pokemon.name;  //name of pokemon originally passed to us
      // pokemon.imageUrl = imageUrl;
    })
    // $http.get(pokemon.url).then(function(response){
    //   console.log('Pokemon info', response.data);
    //   pokemon.imageUrl = response.data.sprites.front_default;
    // }).catch(function(err){
    //   console.log('Error getting info from API', err);
    // })
  }

  function togglePokemon(pokemon) {  //grabed from iChooseYou function
    currentlySelectedPokemon.chosen = false; //changes previous chosen pokemon to false
    currentlySelectedPokemon = pokemon;
    pokemon.chosen = true;  //new pokemon is true
  }
});
