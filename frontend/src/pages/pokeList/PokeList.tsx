import usePokeCardVirtualizer from "@hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import PokeListCell from "@components/PokeListCell/PokeListCell";
import { useEffect, useState } from "react";

import getPokeList from "@hooks/useGetPokemon/useGetPokemon";


function PokeList() {
  const [pokeData, setPokeData] = useState({
    list: [],
    count: 0
  });
  const [_loading, setLoading] = useState(true);

  const verticalGap = 20
  const [itemsPerRow, _setItemsPerRow] = useState(3)
  const [preLoadedItems, _setPreLoadedItems] = useState (0)
  
  useEffect(() => {
      async function loadPokemon() {
          setLoading(true);
          const data = await getPokeList();
          setPokeData({
            list: data.results,
            count: data.count
          });
          setLoading(false);
      }

      loadPokemon();
  }, []);

  const {parentRef, listVirtualizer, parentWidth} = usePokeCardVirtualizer ({
    count: pokeData.count,
    overscan: preLoadedItems,
    lanes: itemsPerRow,
    gap: verticalGap
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
                pokemonList={pokeData.list}
            />
        ))}
      </ul>
    </div>
  );
}

export default PokeList;