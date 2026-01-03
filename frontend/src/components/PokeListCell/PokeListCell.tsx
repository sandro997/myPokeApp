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

const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

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