import type { VirtualItem } from "@tanstack/react-virtual";

export interface PokeItem {
    name: string,
    id: number
}

export interface PokeStore {
    list: PokeItem[]
    count: number
    status: 'idle' | 'loading' | 'success' | 'error'

    updatePokeList: (newList: PokeItem[]) => void
}

export interface GetPokeListProps {
    offset?: number,
    limit?: number,
    nextEndpoint?: string
}

export type TYPE_POKE_LIST_ENDPOINT = (arg0:number, arg1:number) => void
export type TYPE_POKE_SPRITE_ENDPOINT = (arg0: string|undefined) => void

export interface I_POKE_CONFIG {
    TIMEOUT: number,
    RETRY_ATTEMPTS: number,
    LIMIT: number,
    OFFSET: number
}


export interface PokeListCellProps {
    virtualItem: VirtualItem;
    itemsPerRow: number;
    parentWidth: number;
    pokemonList: Array<{ name: string; url: string }>
}

export interface PokeData {
    list: Array<{ name: string; url: string }>;
    count: number;
    next: string | null;
}