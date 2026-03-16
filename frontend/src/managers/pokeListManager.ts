import { usePokeStore } from "~stores/usePokeStore";
import { getPokeList } from "~helpers/getPokemon";
import formatPokemon from "~helpers/formatPokemon"
import { pokeStoreStatus } from "~types/pokeTypes";

function pokeListManager () {
    const updateList = usePokeStore((state) => state.updateList);
    const updateCount = usePokeStore((state) => state.updateCount);
    const updateNext = usePokeStore((state) => state.updateNext);
    const updateStatus = usePokeStore((state) => state.updateStatus);

    const list = usePokeStore((state) => state.list);
    const next = usePokeStore((state) => state.next);
    const status = usePokeStore((state) => state.status);

    const {pokemonPreview} = formatPokemon()

    async function loadPokemon() {
        //verifica se zustand ha già preso la lista dal localStorage
        if (list.length > 0) {
            return;
          }
        
        updateStatus(pokeStoreStatus.fetching);
        //fetch dei dati
        const data = await getPokeList({});

        if (data.results.length === 0) {
            updateStatus(pokeStoreStatus.error);
            return;
        }

        //li formattiamo e salviamo nello store
        updateList (pokemonPreview(data.results))
        updateCount (data.count)
        updateNext(data.next ?? '');

        updateStatus(pokeStoreStatus.idle);
    }

    async function loadMore () {
        if (!next || status !== pokeStoreStatus.idle) return;

        updateStatus(pokeStoreStatus.fetching);

        const data = await getPokeList({ nextEndpoint: next });
        if (data.results.length === 0) {
            updateStatus(pokeStoreStatus.error);
            return;
        }

        updateList([... list, ...pokemonPreview(data.results)]);
        updateNext(data.next ?? '')

        updateStatus(pokeStoreStatus.idle);
    }

    return {loadPokemon, loadMore}
}

export default pokeListManager