import { create } from 'zustand';
import type {PokeStore} from '~types/pokeTypes'

export const usePokeStore = create<PokeStore>()(
    (set) => ({
      list: [],
      count: 0,
      next: '',
      status: 'idle',

  
      updateList: (newList) => set({ list: newList }),
      updateCount: (newCount) => set({count: newCount}),
      updateNext: (newNext) => set({next: newNext})
    }),
  )