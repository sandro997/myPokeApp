import { POKE_SPRITE_ENDPOINT } from "~api/pokeApi";
import type {PokeItem} from "~types/pokeTypes"

function formatPokemon () {

  //mette la prima lettera maiuscola
  const pokemonName = (name:string) => name.charAt(0).toUpperCase() + name.slice(1)

  //estrae l'id, assegna 0 se l'url è undefined
  const pokemonId = (url: string | undefined) => parseInt(url?.split('/').filter(Boolean).pop() ?? '0', 10);

  //compone l'endpoint per lo sprite
  const pokemonSprite = (id: number) => POKE_SPRITE_ENDPOINT(id);

  //crea l'array che andrà a fare la lista
  const pokemonPreview = (data:PokeItem[]) => data.map(item => {
    const id = pokemonId(item.url);
    return {
      id,
      name: pokemonName(item.name),
      url: item.url,
      sprite: pokemonSprite(id)
    };
  });

  return {pokemonName, pokemonSprite, pokemonId, pokemonPreview}
}

export default formatPokemon