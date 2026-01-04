import usePokeCardVirtualizer from "@hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import PokeListCell from "@components/PokeListCell/PokeListCell";
import getPokeList from "@hooks/useGetPokemon/useGetPokemon";
import { useEffect, useState } from "react";

interface PokeData {
  list: Array<{ name: string; url: string }>;
  count: number;
  next: string | null;
}

function PokeList() {
  const [pokeData, setPokeData] = useState<PokeData>({
    list: [],
    count: 0,
    next: null
  });
  const [loading, setLoading] = useState(true);
  const verticalGap = 20
  const [itemsPerRow, _setItemsPerRow] = useState(3)
  const [preLoadedItems, _setPreLoadedItems] = useState (5)
  
  //otteniamo i dati
  useEffect(() => {
      async function loadPokemon() {
          setLoading(true);
          const data = await getPokeList({});
          setPokeData({
            list: data.results,
            count: data.count,
            next: data.next
          });
          setLoading(false);
      }

      loadPokemon();
  }, []);

  const loadMore = async () => {
    if (!pokeData.next || loading) return;
  
    setLoading(true);
    const data = await getPokeList({ nextEndpoint: pokeData.next });
    setPokeData(prev => ({
      list: [...prev.list, ...data.results],
      count: data.count,
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
    count: pokeData.list.length,
    overscan: preLoadedItems,
    lanes: itemsPerRow,
    gap: verticalGap
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
                pokemonList={pokeData.list}
            />
        ))}
      </ul>
    </div>
  );
}

export default PokeList;