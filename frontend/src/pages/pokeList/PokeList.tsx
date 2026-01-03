import PokeCard from "@components/pokeCard/PokeCard";
import usePokeCardSize from "@hooks/usePokeCardSize/usePokeCardSize";
import usePokeCardVirtualizer from "@hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import { useRef, useState } from "react";

function PokeList() {
    const parentRef = useRef<HTMLDivElement>(null)
    const [containerWidth, _setContainerWidth] = useState<number>(470);
    const [itemsPerRow, _setPokePerRow] = useState(3)
    const { cardSize } = usePokeCardSize({ containerWidth, itemsPerRow, itemsGap: 16, rowPadding: 16 });
    const extraRows = 0;
    const rowsGap = 20

    const listTest = [
        'bulbasaur',
        'pikachu',
        'charmander',
        'squirtle',
        'eevee',
        'jigglypuff',
        'snorlax',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
    ];

    const rowVirtualizer = usePokeCardVirtualizer({
        itemsArraySize: listTest.length,
        itemsPerRow,
        parentRef,
        containerHeight: cardSize.height + rowsGap, 
        extraRows
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const totalHeight = rowVirtualizer.getTotalSize();
    

    return (
        <div ref={parentRef} className="h-screen w-full overflow-y-auto contain-strict p-4">
            <ul className="relative w-full" style={{height:`${totalHeight}px`}}>
                {virtualRows.map((virtualRow) => {
                    
                    const startIndex = virtualRow.index * itemsPerRow;
                    const endIndex = Math.min(startIndex + itemsPerRow, listTest.length);
                    const visiblePokemonForRow = listTest.slice(startIndex, endIndex);

                    return (
                        <li
                            key={virtualRow.index}
                            className="absolute top-0 left-0 w-full flex gap-4 align-center justify-between"
                            style={{
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`, 
                            }}
                        >

                            {visiblePokemonForRow.map((pokemon, i) => (
                                <PokeCard 
                                    key={startIndex + i}
                                    name={pokemon} 
                                    cardSize={cardSize} 
                                />
                            ))}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PokeList