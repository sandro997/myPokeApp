import { create } from 'zustand';
import type {PokeStore} from '~types/pokeTypes'
import {pokeStoreStatus} from '~types/pokeTypes'

export const usePokeStore = create<PokeStore>()(
  (set) => ({
    //data
    list: [],
    count: 0,
    next: '',
    status: pokeStoreStatus.idle,
    error: null,

    //update data
    updateList: (newList) => set({ list: newList }),
    updateCount: (newCount) => set({count: newCount}),
    updateNext: (newNext) => set({next: newNext}),
    updateStatus: (newStatus) => set({status: newStatus}),
    updateError: (newError) => set({error: newError}),
  }),
)