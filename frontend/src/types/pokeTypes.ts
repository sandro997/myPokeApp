import type { VirtualItem } from "@tanstack/react-virtual";

export interface PokeItem {
    name: string
    url: string
}

export interface CompletePokemon {
    id: number
    name: string
    url: string
    sprite: string
}

export interface PokeStore {
    list: CompletePokemon[]
    count: number
    next: string
    status: 'idle' | 'fetching' | 'saving' | 'success' | 'error'
    error: string | null
    
    updateList: (newList: CompletePokemon[]) => void
    updateCount: (newCount: number) => void
    updateNext: (newNext: string) => void
    updateStatus: (newStatus: 'idle' | 'fetching' | 'saving' | 'success' | 'error') => void
    updateError: (newError: string | null) => void
}

export interface GetPokeListProps {
    offset?: number
    limit?: number
    nextEndpoint?: string
}

export interface I_POKE_CONFIG {
    TIMEOUT: number
    RETRY_ATTEMPTS: number
    LIMIT: number
    OFFSET: number
}

export interface PokeListCellProps {
    virtualItem: VirtualItem
    itemsPerRow: number
    parentWidth: number
    pokemonList: CompletePokemon[]
}

export interface PokeApiData {
    results: PokeItem[]
    count: number
    next: string | null
}

export type TYPE_POKE_LIST_ENDPOINT = (arg0:number, arg1:number) => string
export type TYPE_POKE_SPRITE_ENDPOINT = (arg0: number|undefined) => string