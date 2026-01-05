import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {PokeStore} from '~types/pokeTypes'

export const usePokeStore = create<PokeStore>()(
    persist(
      (set, get) => ({
        list: [],
        count: 0,
        status: 'idle',
  
        updatePokeList: (newList) => set({ list: newList }),
      }),
      options
    )
  )