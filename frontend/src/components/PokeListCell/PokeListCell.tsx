import PokeCard from "~components/pokeCard/PokeCard";
import { POKE_SPRITE_ENDPOINT } from "~api/pokeApi";
import type {PokeListCellProps} from "~types/pokeTypes"

function PokeListCell({ virtualItem, itemsPerRow, parentWidth, pokemonList }: PokeListCellProps) {

  //otteniamo nome, id e sprite del singolo pokemon
  const pokemon = pokemonList[virtualItem.index];
  const pokemonName = pokemon?.name || 'Unknown';

  const pokemonId = pokemon?.url.split('/').filter(Boolean).pop();
  const spriteUrl = POKE_SPRITE_ENDPOINT(pokemonId);

  // Calcola la riga corrente e la posizione nella riga (laneInRow)
  const laneInRow = virtualItem.index % itemsPerRow;
  const itemWidth = Math.floor(parentWidth / itemsPerRow);
  const itemPosition = laneInRow * itemWidth;

  return (
    <li
      id={`${virtualItem.key}`}
      className="absolute"
      style={{
        left: `${itemPosition}px`,
        width: `${itemWidth}px`,
        height: `${virtualItem.size}px`,
        // Spostiamo l'elemento in basso alla sua posizione corretta
        transform: `translateY(${virtualItem.start}px)`, 
      }}
    >
      <PokeCard name={pokemonName} image={spriteUrl}/>
    </li>
  );
}
export default PokeListCell;