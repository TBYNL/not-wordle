import React, { useEffect, useState } from "react";
import { Words, RandomWord } from "../words";
import { Keyboard } from "./Keyboard/Keyboard";
import Line from "./Line";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";
import { Button } from "@mui/material";
import { FadeIn } from "./Animation/FadeIn";

const Home = () => {
  const {
    word,
    setWord,
    bgColor,
    setModalDetails,
    winStreak,
    setWinStreak,
    bestStreak,
    setBestStreak,
    storedGuesses,
    setStoredGuesses,
    deleteStoredGuesses,
  } = useStore((state) => ({
    word: state.word,
    setWord: state.setWord,
    bgColor: state.bgColor,
    setModalDetails: state.setModalDetails,
    winStreak: state.winStreak,
    setWinStreak: state.setWinStreak,
    bestStreak: state.bestStreak,
    setBestStreak: state.setBestStreak,
    storedGuesses: state.storedGuesses,
    setStoredGuesses: state.setStoredGuesses,
    deleteStoredGuesses: state.deleteStoredGuesses,
  }));

  const [allWords] = useState(Words);
  const numberOfGuesses = 6;

  const getBlankGuesses = (totalGuesses) => {
    return Array.from({ length: totalGuesses }).map((_, i) => ({
      id: i,
      submitted: false,
      values: [],
      previousLineSubmitted: i === 0 ? true : false,
    }));
  };

  const [guesses, setGuesses] = useState(
    storedGuesses || getBlankGuesses(numberOfGuesses)
  );

  const [correctLetters, setCorrectLetters] = useState([]);
  const [outOfPositionLetters, setOutOfPositionLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  const [wordGuessed, setWordGuessed] = useState(false);
  const [totalSubmittedGuesses, setTotalSubmittedGuesses] = useState(
    guesses.filter((guess) => guess.submitted).length
  );

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

    setGuesses([...updatedGuesses]);
    setStoredGuesses([...updatedGuesses]);
  };

  const setLetterStates = (letters) => {
    let updatedCorrectLetters = correctLetters;
    let updatedIncorrectLetters = incorrectLetters;
    let updatedOutOfPositionLetters = outOfPositionLetters;

    const wordChars = [...word].map((char, index) => {
      return {
        char,
        position: index + 1,
      };
    });

    letters.forEach((letter, index) => {
      if (word.includes(letter)) {
        if (
          wordChars.find((char) => char.position === index + 1).char === letter
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
  }

  const onSubmitLine = (letters, id) => {
    let wordGuess = letters.join("");

    if (!allWords.includes(wordGuess.toLowerCase())) {
      return;
    }

    updateGuesses(letters, id);
    setLetterStates(letters);

    // is correct
    if (wordGuess === word) {
      setWordGuessed(true);

      setModalDetails({
        title: "Congrats",
        description: `The word was: ${word}`,
        show: true,
        children: (
          <Button color="success" variant="outlined" onClick={getNewWord}>
            Get New Word
          </Button>
        ),
      });

      const updatedWinStreak = winStreak + 1;

      setWinStreak(updatedWinStreak);

      if (updatedWinStreak > bestStreak) {
        setBestStreak(updatedWinStreak);
      }
    } else {
      setTotalSubmittedGuesses(totalSubmittedGuesses + 1);
    }
  };

  const getNewWord = () => {
    setModalDetails({
      title: "",
      description: "",
      show: false,
      children: undefined,
    });

    deleteStoredGuesses();
    setWord(RandomWord.toUpperCase());
    window.location.reload();
  };

  useEffect(() => {
    if (!wordGuessed && totalSubmittedGuesses === numberOfGuesses) {
      setModalDetails({
        title: "Unlucky mate",
        description: `The word was: ${word}`,
        show: true,
        children: (
          <Button color="error" variant="outlined" autoFocus onClick={getNewWord}>
            Get New Word
          </Button>
        ),
      });
      setWinStreak(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordGuessed, totalSubmittedGuesses]);

  return (
    <>
      <HomeWrapper bgColor={bgColor}>
        {Array.from({ length: numberOfGuesses }).map((_, i) => (
          <FadeIn key={i} delay={i * 400}>
            <Line
              id={i}
              onSubmit={onSubmitLine}
              previousLineSubmitted={guesses[i].previousLineSubmitted}
              submitted={guesses[i].submitted}
              storedGuess={guesses[i].values}
              word={word}
            />
          </FadeIn>
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

const KeyboardWrapper = styled(
  "div",
  {}
)((p) => ({
  display: "flex",
  justifyContent: "center",
  width: "100vw",
}));

const HomeWrapper = styled("div", {
  shouldForwardProp: (props) => props !== "bgColor",
})((p) => ({
  padding: "20px",
  backgroundColor: p.bgColor,
  display: "grid",
  justifyContent: "center",
}));

export default Home;
