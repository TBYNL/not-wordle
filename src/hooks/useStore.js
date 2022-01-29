import create from 'zustand'
import { decryptData, encryptData } from '../utils';
import { RandomWord } from "../words";

const encryptionKey = "NotWordleEncryptionKey";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
const deleteLocalStorage = (key, value) =>
  window.localStorage.removeItem(key);

export const useStore = create((set, get) => ({
  onScreenKeyPressed: undefined,
  setOnScreenKeyPressed: (key) => set({ onScreenKeyPressed: key }),

  storedGuesses: getLocalStorage("storedGuesses") ?? null,
  setStoredGuesses: (storedGuesses) => set(() => {
    setLocalStorage("storedGuesses", storedGuesses);
    return { storedGuesses }
  }),
  deleteStoredGuesses: () => deleteLocalStorage("storedGuesses"),

  // correctLetters:, 
  // setCorrectLetters
  // outOfPositionLetters
  // setOutOfPositionLetters
  // incorrectLetters
  // setIncorrectLetters

  gamesPlayed: getLocalStorage("gamesPlayed") ?? 0,
  setGamesPlayed: (gamesPlayed) => set(() => {
    setLocalStorage("gamesPlayed", gamesPlayed);
    return { gamesPlayed }
  }),

  gamesWon: getLocalStorage("gamesWon") ?? 0,
  setGamesWon: (gamesWon) => set(() => {
    setLocalStorage("gamesWon", gamesWon);
    return { gamesWon }
  }),

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

  getBGColor: () => {
    const darkMode = get().darkMode;
    return darkMode ? 'rgba(0, 0, 0, 0.8)' : '#adadad';
  }, 
  
  getTextColor: () => {
    const darkMode = get().darkMode;
    return darkMode ? '#adadad' : 'rgba(0, 0, 0, 0.8)';
  },

  modal: { show: false, title: '', description: '', children: '' },
  setModalDetails: (modalDetails) => set((state) => {
    return { modal: { ...modalDetails }}
  }),

  getWord: () => {
    if (getLocalStorage("word")) {
      return decryptData(getLocalStorage("word"), encryptionKey);
    }
    
    const newWord = RandomWord.toUpperCase();

    setLocalStorage("word", encryptData(newWord, "NotWordleEncryptionKey"));
    return newWord;
  },
  setWord: (word) => set((state) => {
    setLocalStorage("word", encryptData(word, "NotWordleEncryptionKey"));
    return word;
  })
}))