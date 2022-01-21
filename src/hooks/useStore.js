import create from 'zustand'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create(set => ({
  onScreenKeyPressed: undefined,
  setOnScreenKeyPressed: (key) => set({ onScreenKeyPressed: key }),

  darkMode: getLocalStorage("darkMode") ?? true,
  setDarkMode: (darkMode) => set(state => {
    setLocalStorage("darkMode", darkMode);
    return { darkMode }
  })
}))