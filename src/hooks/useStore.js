import create from 'zustand'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set, get) => ({
  onScreenKeyPressed: undefined,
  setOnScreenKeyPressed: (key) => set({ onScreenKeyPressed: key }),

  winStreak: getLocalStorage("winStreak") ?? 0,
  setWinStreak: (winStreak) => set(() => {
    setLocalStorage("winStreak", winStreak);
    return { winStreak }
  }),

  bestStreak: getLocalStorage("bestStreak") ?? 0,
  setBestStreak: (bestStreak) => set(() => {
    setLocalStorage("bestStreak", bestStreak);
    return { bestStreak }
  }),

  darkMode: getLocalStorage("darkMode") ?? true,
  setDarkMode: (darkMode) => set(() => {
    setLocalStorage("darkMode", darkMode);
    return { darkMode }
  }),

  bgColor: () => {
    const darkMode = get().darkMode;
    return darkMode ? 'rgba(0, 0, 0, 0.8)' : '#adadad';
  }, 
  
  textColor: () => {
    const darkMode = get().darkMode;
    return darkMode ? '#adadad' : 'rgba(0, 0, 0, 0.8)';
  },

  modal: { show: false, title: '', description: '', children: '' },
  setModalDetails: (modalDetails) => set((state) => {
    return { modal: { ...modalDetails }}
  }),
}))