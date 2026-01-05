import type { VirtualItem } from "@tanstack/react-virtual";

export interface PokeItem {
    name: string,
    url: string
}

export interface PokeStore {
    list: PokeItem[]
    updateList: (newList: PokeItem[]) => void
}

export interface GetPokeListProps {
    offset?: number,
    limit?: number,
    nextEndpoint?: string
}

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
    pokemonList: PokeItem[]
}

export interface PokeData {
    count: number;
    next: string | null;
}

export type TYPE_POKE_LIST_ENDPOINT = (arg0:number, arg1:number) => string
export type TYPE_POKE_SPRITE_ENDPOINT = (arg0: string|undefined) => string