import React, { useEffect, useState } from "react";
import { Keyboard } from "./Keyboard/Keyboard";
import Line from "./Line";
import { styled } from '@mui/system';
import { useStore } from "../hooks/useStore";
import { Button } from "@mui/material";

const Home = () => {
  const store = useStore();

  const numberOfGuesses = store.gameWordLength + 1;
  const numberOfLetters = store.gameWordLength;

  // const getBlankGuesses = (totalGuesses) => {
  //   return Array.from({ length: totalGuesses }).map((_, i) => ({
  //     id: i,
  //     submitted: false,
  //     values: [],
  //     previousLineSubmitted: i === 0 ? true : false,
  //   }));
  // };

  const guesses = store.getStoredGuesses();

  const [correctLetters, setCorrectLetters] = useState([]);
  const [outOfPositionLetters, setOutOfPositionLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  const [wordGuessed, setWordGuessed] = useState(guesses.some(guess => guess.values.join("") === store.getWord()) || false);

  const updateGuesses = (letters, index) => {
    const updatedGuesses = guesses.map((g, i) => {
      if (i === index) {
        g.values = [...letters];
        g.submitted = true;
      }

      if (i === index + 1) {
        g.previousLineSubmitted = true;
      }

      return g;
    });

    // setGuesses([...updatedGuesses]);
    store.setStoredGuesses([...updatedGuesses]);
  };

  const setLetterStates = (letters) => {
    let updatedCorrectLetters = correctLetters;
    let updatedIncorrectLetters = incorrectLetters;
    let updatedOutOfPositionLetters = outOfPositionLetters;

    const wordChars = [...store.getWord()].map((char, index) => {
      return {
        char,
        position: index + 1,
      };
    });

    letters.forEach((letter, index) => {
      if (store.getWord().includes(letter)) {
        if (
          wordChars?.find((char) => char.position === index + 1).char === letter
        ) {
          // correct
          updatedCorrectLetters.push(letter);
          setCorrectLetters(updatedCorrectLetters);

          // remove out of position letters if are correct in another position
          if (updatedOutOfPositionLetters.includes(letter)) {
            updatedOutOfPositionLetters = updatedOutOfPositionLetters.filter(
              (oopLetter) => oopLetter !== letter
            );
            setOutOfPositionLetters(updatedOutOfPositionLetters);
          }
        } else {
          if (!updatedCorrectLetters.includes(letter)) {
            // correct + out of position
            updatedOutOfPositionLetters.push(letter);
            setOutOfPositionLetters(updatedOutOfPositionLetters);
          }
        }
      } else {
        // incorrect
        updatedIncorrectLetters.push(letter);
        setIncorrectLetters(updatedIncorrectLetters);
      }
    });
  };

  const gameCompleted = () => {
    setWordGuessed(true);

    const updatedWinStreak = store.winStreak + 1;

    store.setWinStreak(updatedWinStreak);
    store.setGamesWon(store.gamesWon + 1);

    if (updatedWinStreak > store.bestStreak) {
      store.setBestStreak(updatedWinStreak);
    }
  }

  const onSubmitLine = (letters, id) => {
    let wordGuess = letters.join("");

    updateGuesses(letters, id);

    // is correct
    if (wordGuess === store.getWord()) {
      gameCompleted();
    }
    
    if (wordGuess === store.getWord() || guesses.filter((guess) => guess.submitted).length === numberOfGuesses) {
      store.setGamesPlayed(store.gamesPlayed + 1);
    }
  };

  const getNewWord = () => {
    store.setModalDetails({
      title: "",
      description: "",
      show: false,
      children: undefined,
    });

    store.deleteStoredGuesses();
    store.setWord(store.gameWordLength);
    const timer = setTimeout(() => {
      window.location.reload();
    }, 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (!wordGuessed && guesses.filter((guess) => guess.submitted).length === numberOfGuesses) {
      const timer = setTimeout(() => {
        store.setModalDetails({
          title: "Unlucky mate",
          description: `The word was: ${store.getWord()}`,
          show: true,
          children: (
            <Button
              color="error"
              variant="outlined"
              autoFocus
              onClick={getNewWord}
            >
              Get New Word
            </Button>
          ),
        });
        store.setWinStreak(0);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (wordGuessed) {
      const timer = setTimeout(() => {
        store.setModalDetails({
          title: "Congrats",
          description: `The word was: ${store.getWord()}`,
          show: true,
          children: (
            <Button color="success" variant="outlined" onClick={getNewWord}>
              Get New Word
            </Button>
          ),
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordGuessed, guesses]);

  useEffect(() => {
    guesses.forEach(guess => {
    if (guess?.values?.length > 0) {
      setLetterStates(guess.values);
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses])

  useEffect(() => {
    if (guesses.filter((guess) => guess.values.length > 0).length === 0) {
      setCorrectLetters([]);
      setIncorrectLetters([]);
      setOutOfPositionLetters([]);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.gameWordLength])

  // useEffect(() => {
  //   fetch("https://api.datamuse.com/words?sp=spacious&max=1")
  //   fetch("https://ya5el36y0f.execute-api.us-west-2.amazonaws.com/staging")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const t = JSON.parse(json.body);
  //       debugger;
  //     });
  // }, []);

  return (
    <>
      <HomeWrapper bgColor={store.bgColor}>
        {Array.from({ length: numberOfGuesses }).map((_, i) => (
          <Line
            key={i}
            id={i}
            onSubmit={onSubmitLine}
            numberOfLetters={numberOfLetters}
          />
        ))}
      </HomeWrapper>
      <KeyboardWrapper>
        <Keyboard
          correctLetters={correctLetters}
          outOfPositionLetters={outOfPositionLetters}
          incorrectLetters={incorrectLetters}
        />
      </KeyboardWrapper>
    </>
  );
};

const KeyboardWrapper = styled("div", {})(() => ({
  margin: 'auto',
  marginTop: '1vh',
  width: '98%',
}));

const HomeWrapper = styled("div", {
  shouldForwardProp: (props) => props !== "bgColor",
})((p) => ({
  bottom: 0,
  padding: "20px",
  backgroundColor: p.bgColor,
  display: "grid",
  justifyContent: "center",
}));

export default Home;
