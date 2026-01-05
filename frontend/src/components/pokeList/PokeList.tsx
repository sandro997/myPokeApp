import { useEffect, useState } from "react";
import PokeListCell from "~components/pokeListCell/PokeListCell";
import getPokeList from "~hooks/useGetPokemon/useGetPokemon";
import usePokeCardVirtualizer from "~hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import type {PokeData, PokeStore} from "~types/pokeTypes"
import { usePokeStore } from "~stores/usePokeStore";

function PokeList() {
  //estraiamo i metodi dallo store
  const pokeStore: PokeStore = {
    list: usePokeStore((state) => state.list),
    updateList: usePokeStore((state) => state.updateList)
  }

  const [pokeData, setPokeData] = useState<PokeData>({
    count: 0,
    next: null
  });
  const [loading, setLoading] = useState(true);
  const [itemsPerRow, _setItemsPerRow] = useState(3)
  const [preLoadedItems, _setPreLoadedItems] = useState (5)
  

  //otteniamo i dati al mount
  useEffect(() => {
      async function loadPokemon() {

          setLoading(true);
        
          const data = await getPokeList({});
        
          pokeStore.updateList (data.results)
        
          setPokeData({
            count: data.count,
            next: data.next
          });
        
          setLoading(false);
      }

      loadPokemon();
  }, []);

  // fornisce il nuovo edpoint per ottenere i pokemon a gruppi di 20 e aggiorna lo store
  const loadMore = async () => {
    if (!pokeData.next || loading) return;
  
    setLoading(true);
    
    const data = await getPokeList({ nextEndpoint: pokeData.next });
    pokeStore.updateList([...pokeStore.list, ...data.results])
    setPokeData(prev => ({
      ...prev,
      next: data.next
    }));
    
    setLoading(false);
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollElement = e.currentTarget;
    const scrollPercentage = 
      (scrollElement.scrollHeight - scrollElement.scrollTop) / scrollElement.scrollHeight;
    
    if (scrollPercentage < 0.4 && pokeData.next && !loading) {
      loadMore();
    }
  };

  //virtualizer
  const {parentRef, listVirtualizer, parentWidth} = usePokeCardVirtualizer ({
    count: pokeStore.list.length,
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
              pokemonList={pokeStore.list}
            />
        ))}
      </ul>
    </div>
  );
}

export default PokeList;