import getPokeList from "~hooks/useGetPokemon/useGetPokemon";
import formatPokemon from "~helpers/formatPokemon"
import { usePokeStore } from "~stores/usePokeStore";

function usePokeListManager () {
    const updateList = usePokeStore((state) => state.updateList);
    const updateCount = usePokeStore((state) => state.updateCount);
    const updateNext = usePokeStore((state) => state.updateNext);
    const updateStatus = usePokeStore((state) => state.updateStatus);

    const list = usePokeStore((state) => state.list);
    const next = usePokeStore((state) => state.next);
    const status = usePokeStore((state) => state.status);

    const {pokemonPreview} = formatPokemon()

    async function loadPokemon() {
        updateStatus('fetching');
        //otteniamo i dati
        const data = await getPokeList({});

        if (data.results.length === 0) {
            updateStatus('error');
            return;
        }

        //li formatiamo e salviamo nello store
        updateList (pokemonPreview(data.results))
        updateCount (data.count)
        updateNext(data.next ?? '');

        updateStatus('idle');
    }

    async function loadMore () {
        if (!next || status !== 'idle') return;

        updateStatus('fetching');

        const data = await getPokeList({ nextEndpoint: next });
        if (data.results.length === 0) {
            updateStatus('error');
            return;
        }

        updateList([... list, ...pokemonPreview(data.results)]);
        updateNext(data.next ?? '')

        updateStatus('idle');
    }

    return {loadPokemon, loadMore}
}

export default usePokeListManager