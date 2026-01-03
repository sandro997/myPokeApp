import usePokeCardVirtualizer from "@hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import { useState } from "react";
import PokeListCell from "@components/PokeListCell/PokeListCell";


function PokeList() {

  //36 elementi
  const listTest = [
    'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test', 'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test', 'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test'
  ];

  const [itemsPerRow, _setItemsPerRow] = useState(3)
  const [preLoadedItems, _setPreLoadedItems] = useState (1)

  const {parentRef, listVirtualizer, parentWidth} = usePokeCardVirtualizer ({
    count: listTest.length,
    overscan: preLoadedItems,
    lanes: itemsPerRow,
    gap: 20
  })

  return (
    <div className="h-screen overflow-auto w-full p-4" ref={parentRef}>
      <ul className="w-full relative"
        style={{height: `${listVirtualizer.getTotalSize()}px`}}
      >
        {listVirtualizer.getVirtualItems().map(virtualItem => (
            <PokeListCell
                key={virtualItem.key}
                virtualItem={virtualItem}
                itemsPerRow={itemsPerRow}
                parentWidth={parentWidth}
                listTest={listTest}
            />
        ))}
      </ul>
    </div>
  );
}

export default PokeList;