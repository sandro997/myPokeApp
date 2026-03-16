import type { VirtualItem } from "@tanstack/react-virtual";

export interface PokeItem {
    name: string
    url: string
}

export interface PreviewPokemon {
    id: number
    name: string
    url: string
    sprite: string
}

//TODO: spostare in un file apposito se aumentano gli store
export const pokeStoreStatus = {
    idle: 'idle',
    fetching: 'fetching',
    saving: 'saving',
    success: 'success',
    error: 'error',
} as const;

export type PokeStoreStatusEnum = (typeof pokeStoreStatus)[keyof typeof pokeStoreStatus];

export interface PokeStore {
    list: PreviewPokemon[]
    count: number
    next: string
    status: PokeStoreStatusEnum
    error: string | null
    
    updateList: (newList: PreviewPokemon[]) => void
    updateCount: (newCount: number) => void
    updateNext: (newNext: string) => void
    updateStatus: (newStatus: PokeStoreStatusEnum) => void
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
    pokemonList: PreviewPokemon[]
}

export interface PokeApiData {
    results: PokeItem[]
    count: number
    next: string | null
}

export type TYPE_POKE_LIST_ENDPOINT = (arg0:number, arg1:number) => string
export type TYPE_POKE_SPRITE_ENDPOINT = (arg0: number|undefined) => string