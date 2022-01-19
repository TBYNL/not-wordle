import create from 'zustand'

export const useStore = create(set => ({
  nextLetterRef: undefined,
  setNextLetterRef: (ref) => set({ nextLetterRef: ref }),

  previousLetterRef: undefined,
  setPreviousLetterRef: (ref) => set({ previousLetterRef: ref }),

  previousLetterSetter: undefined,
  setPreviousLetterSetter: (setter) => set({ previousLetterSetter: setter }),

  currentLetterSetter: undefined,
  setCurrentLetterSetter: (setter) => set({ currentLetterSetter: setter }),

  nextLetterSetter: undefined,
  setNextLetterSetter: (setter) => set({ nextLetterSetter: setter }),

  onScreenKeyPressed: undefined,
  setOnScreenKeyPressed: (key) => set({ onScreenKeyPressed: key })
}))