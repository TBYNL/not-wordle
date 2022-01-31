import create from 'zustand'
import { decryptData, encryptData } from '../utils';
import { RandomWord as randomFourLetterWord } from "../wordFiles/fourLetterWords";
import { RandomWord as randomFiveLetterWord } from "../wordFiles/fiveLetterWords";
import { RandomWord as randomSixLetterWord } from "../wordFiles/sixLetterWords";
import { RandomWord as randomSevenLetterWord } from "../wordFiles/sevenLetterWords";

const encryptionKey = "NotWordleEncryptionKey";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
const deleteLocalStorage = (key, value) =>
  window.localStorage.removeItem(key);

const getRandomWord = (gameWordLength) => {
  switch (gameWordLength) {
    case 4:
      return randomFourLetterWord.toUpperCase();
    case 5:
      return randomFiveLetterWord.toUpperCase();
    case 6:
      return randomSixLetterWord.toUpperCase();
    case 7:
      return randomSevenLetterWord.toUpperCase();
    default:
      return randomFiveLetterWord.toUpperCase();
  }
}

const getBlankGuesses = (totalGuesses) => {
  return Array.from({ length: totalGuesses }).map((_, i) => ({
    id: i,
    submitted: false,
    values: [],
    previousLineSubmitted: i === 0 ? true : false,
  }));
};

export const useStore = create((set, get) => ({
  // Keyboard state
  onScreenKeyPressed: undefined,
  setOnScreenKeyPressed: (key) => set({ onScreenKeyPressed: key }),

  gameWordLength: getLocalStorage("gameWordLength") || 5,
  setGameWordLength: (gameWordLength) => set(() => {
    setLocalStorage("gameWordLength", gameWordLength);
    get().setWord(gameWordLength);
    get().setStoredGuesses(getBlankGuesses(gameWordLength + 1));
    return { gameWordLength }
  }),

  // Game state
  getWord: () => {
    if (getLocalStorage("word")) {
      return decryptData(getLocalStorage("word"), encryptionKey);
    }

    const newWord = getRandomWord(get().gameWordLength);

    setLocalStorage("word", encryptData(newWord, "NotWordleEncryptionKey"));
    return newWord;
  },
  setWord: (length) => set(() => {
    const newWord = getRandomWord(length);

    setLocalStorage("word", encryptData(newWord, "NotWordleEncryptionKey"));
    return newWord;
  }),

  getStoredGuesses: () => {
    return getLocalStorage("storedGuesses") ?? getBlankGuesses(get().gameWordLength + 1)
  },
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

  // Stats state
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

  // Page state
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
}))