import getPokeList from "~hooks/useGetPokemon/useGetPokemon";
import useProcessApiData from "~hooks/useProcessApiData/useProcessApiData"
import { usePokeStore } from "~stores/usePokeStore";
import { useState } from "react"

function usePokeListManager () {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const updateList = usePokeStore((state) => state.updateList);
    const updateCount = usePokeStore((state) => state.updateCount);
    const updateNext = usePokeStore((state) => state.updateNext)

    const list = usePokeStore((state) => state.list);
    const next = usePokeStore((state) => state.next);

    const {completePokemon} = useProcessApiData()
    
    async function loadPokemon() {
        setIsLoading(true);
        //otteniamo i dati
        const data = await getPokeList({});

        //li formattiamo
        const formattedData = completePokemon(data.results)

        //salviamo nello store
        updateList (formattedData)
        updateCount (data.count)
        updateNext(data.next);
      
        setIsLoading(false);
    }


    async function loadMore () {
        if (!next || isLoading) return;
  
        setIsLoading(true);
        
        const data = await getPokeList({ nextEndpoint: next });
        const formattedData = completePokemon(data.results);
        updateList([... list, ...formattedData]);
    
        updateNext(data.next)
        
        setIsLoading(false);
    }

    return {isLoading, loadPokemon, loadMore}
}

export default usePokeListManager