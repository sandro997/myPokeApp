import axios from "axios";
import { POKE_LIST_ENDPOINT, POKE_CONFIG } from "@api/pokeApi"

interface GetPokeListProps {
    limit?: number,
    nextEndpoint?: string
}

async function getPokeList({limit = 20, nextEndpoint}:GetPokeListProps) {
    const endpoint = nextEndpoint ? nextEndpoint : POKE_LIST_ENDPOINT (0, limit) 
    try {
        const response = await axios.get(
            endpoint,
            { timeout:POKE_CONFIG.TIMEOUT }
        )
        
        const { results, count, next } = response.data
        
        if (!results || !results.length) {
            console.warn('Nessun Pokémon trovato')
            return { pokeList: [], count: 0 }
        }
        
        return { results, count, next }
        
    } catch (error) {
        console.error('Errore nel fetch dei Pokémon:')
        return { pokeList: [], count: 0 }
    }
}

export default getPokeList
