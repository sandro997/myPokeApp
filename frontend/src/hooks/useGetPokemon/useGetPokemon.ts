import axios from "axios";

async function getPokeList() {
    try {
        const response = await axios.get(
            'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
            { timeout: 10000 }
        )
        
        const { results, count } = response.data
        
        if (!results || !results.length) {
            console.warn('Nessun Pokémon trovato')
            return { pokeList: [], count: 0 }
        }
        
        return { results, count }
        
    } catch (error) {
        console.error('Errore nel fetch dei Pokémon:')
        return { pokeList: [], count: 0 }
    }
}

export default getPokeList
