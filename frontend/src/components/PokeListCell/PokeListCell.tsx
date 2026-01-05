import PokeCard from "~components/pokeCard/PokeCard";
import useProcessApiData from "~hooks/useProcessApiData/useProcessApiData"
import type {PokeListCellProps} from "~types/pokeTypes"

function PokeListCell({ virtualItem, itemsPerRow, parentWidth, pokemonList }: PokeListCellProps) {

  //otteniamo nome, id e sprite del singolo pokemon
  const pokemon = pokemonList[virtualItem.index];
  const {pokemonName, sprite} = useProcessApiData(pokemon.name, pokemon.url)

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
      <PokeCard name={pokemonName} image={sprite}/>
    </li>
  );
}
export default PokeListCell;