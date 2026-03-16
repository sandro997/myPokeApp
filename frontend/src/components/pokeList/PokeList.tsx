import { useEffect, useState } from "react";
import { usePokeStore } from "~stores/usePokeStore";
import pokeListManager from "~managers/pokeListManager";
import PokeListCell from "~components/pokeListCell/PokeListCell";
import usePokeCardVirtualizer from "~hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";

function PokeList() {

  const [itemsPerRow, _setItemsPerRow] = useState<number>(3);
  const [preLoadedItems, _setPreLoadedItems] = useState<number> (5);

  const {loadPokemon, loadMore} = pokeListManager();

  //estraiamo i dati dallo store
  const list = usePokeStore((state) => state.list);
  const next = usePokeStore((state) => state.next);
  const status = usePokeStore((state) => state.status);

  //otteniamo i dati al mount
  useEffect(() => {
    loadPokemon()
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollElement = e.currentTarget;
    const scrollPercentage = (scrollElement.scrollHeight - scrollElement.scrollTop) / scrollElement.scrollHeight;
    
    if (scrollPercentage < 0.4 && next && status === 'idle') {
      loadMore();
    }
  };

  //virtualizer
  const {parentRef, listVirtualizer, parentWidth} = usePokeCardVirtualizer ({
    count:  list.length,
    overscan: preLoadedItems,
    lanes: itemsPerRow,
  })

  //TODO: verificare github tankstack per il flushsync
  return (
    <div className="h-2/3 overflow-auto w-full p-4" ref={parentRef} onScroll={handleScroll}>
      <ul className="w-full relative"
        style={{height: `${listVirtualizer.getTotalSize()}px`}}
      >
        {listVirtualizer.getVirtualItems().map(virtualItem => (
            <PokeListCell
              key={virtualItem.key}
              virtualItem={virtualItem}
              itemsPerRow={itemsPerRow}
              parentWidth={parentWidth}
              pokemonList={list}
            />
        ))}
      </ul>
    </div>
  );
}

export default PokeList;