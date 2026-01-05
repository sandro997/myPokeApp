import { POKE_SPRITE_ENDPOINT } from "~api/pokeApi";

function useProcessApiData (name:string, url:string) {

  //mette la prima lettera maiuscola
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1)

  const pokemonId = url.split('/').filter(Boolean).pop();

  const sprite = POKE_SPRITE_ENDPOINT(pokemonId);

  return {pokemonName, sprite, pokemonId}
}

export default useProcessApiData