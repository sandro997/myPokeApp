import type { VirtualItem } from "@tanstack/react-virtual";
import PokeCard from "@components/pokeCard/PokeCard";

interface PokeListCellProps {
  virtualItem: VirtualItem;
  itemsPerRow: number;
  parentWidth: number;
  pokemonList: Array<{ name: string; url: string }>
} 

function PokeListCell({ virtualItem, itemsPerRow, parentWidth, pokemonList }: PokeListCellProps) {

const pokemon = pokemonList[virtualItem.index];
const pokemonName = pokemon?.name || 'Unknown';


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
      <PokeCard name={pokemonName} />
    </li>
  );
}
export default PokeListCell;