import { create } from 'zustand';
import type {PokeStore} from '~types/pokeTypes'

export const usePokeStore = create<PokeStore>()(
      (set) => ({
        list: [],

  
        updateList: (newList) => set({ list: newList }),
      }),
  )