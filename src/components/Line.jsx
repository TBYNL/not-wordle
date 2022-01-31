import React, { useCallback, useEffect, useState } from "react";
import { styled } from '@mui/system';
import { Words as fourLetterWords } from "../wordFiles/fourLetterWords";
import { Words as fiveLetterWords } from "../wordFiles/fiveLetterWords";
import { Words as sixLetterWords } from "../wordFiles/sixLetterWords";
import { Words as sevenLetterWords } from "../wordFiles/sevenLetterWords";
import { useStore } from "../hooks/useStore";
import { Shake } from "./Animation/Shake";
import { Flip } from "./Animation/Flip";
const Line = ({
  id,
  onSubmit,
  // previousLineSubmitted,
  // submitted,
  // storedGuess,
  numberOfLetters
}) => {
  const word = useStore((state) => state.getWord());
  const storedGuess = useStore((state) => state.getStoredGuesses()[id]);

  const onScreenKeyPressed = useStore((state) => state.onScreenKeyPressed);
  const inputTextColor = useStore((state) => state.getTextColor());
  const darkMode = useStore((state) => state.darkMode);
  const gameWordLength = useStore((state) => state.gameWordLength);

  const getAllWordsForGameLength = useCallback(() => {
    switch (gameWordLength) {
      case 4:
        return fourLetterWords;
      case 5:
        return fiveLetterWords;    
      case 6:
        return sixLetterWords;    
      case 7:
        return sevenLetterWords;
      default:
        return fiveLetterWords;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameWordLength])

  const [invalidWord, setInvalidWord] = useState(false);

  const [guess, setGuess] = useState(storedGuess?.values || []);

  const onKeyDown = (e) => {
    if (storedGuess?.submitted || !storedGuess?.previousLineSubmitted) {
      return;
    }

    if (["{bksp}", "Backspace"].includes(e.key)) {
      setGuess((prev) => {
        const updatedGuess = [...prev];
        updatedGuess.pop();
        return updatedGuess;
      });
    }
    if (e.key === "Tab") {
      e.stopPropagation();
      e.preventDefault();
    }

    if (e.key === "Enter") {
      let wordGuess = guess.join("");

      if (!getAllWordsForGameLength().includes(wordGuess.toLowerCase()) || guess.length < gameWordLength) {
        setInvalidWord(true);
        return;
      }

      setInvalidWord(false);
      onSubmit(guess, id);
    }

    if (/^[a-z]$/.test(e.key.toLowerCase()) && guess.length < gameWordLength) {
      setGuess((prev) => [...prev, e.key.toUpperCase()]);
    }
  };

  const wordChars = [...word].map((char, index) => {
    return {
      char,
      position: index,
    };
  });

  const getBGColor = useCallback(
    (index) => {
      let color;
      if (storedGuess?.submitted) {
        const letter = guess[index];

        if (word.includes(letter)) {
          color = "#b8860b";

          if (
            wordChars.find((char) => char.position === index).char === letter
          ) {
            color = "#417505";
          }
        }

        if (!storedGuess?.submitted) {
          color = "";
        }
      }

      return color;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storedGuess?.submitted, gameWordLength]
  );

  const getBorderColor = useCallback((value) => {
    if (invalidWord) {
      return "#e23636";
    }

    return value !== undefined ? "#417505" : inputTextColor;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, invalidWord, gameWordLength]);

  useEffect(() => {
    if (onScreenKeyPressed && !storedGuess?.submitted && storedGuess?.previousLineSubmitted) {
      var keyDown = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: onScreenKeyPressed,
      });

      document.activeElement.dispatchEvent(keyDown);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreenKeyPressed]);

  useEffect(() => {
    if (storedGuess?.values.length === 0) {
      setGuess([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameWordLength]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (invalidWord) {
        setInvalidWord(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [invalidWord]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess.length, guess, storedGuess?.previousLineSubmitted, storedGuess?.submitted]);

  return (
    <fieldset
      disabled={storedGuess?.submitted || !storedGuess?.previousLineSubmitted}
      style={{
        border: "none",
        display: "flex",
        paddingTop: "2px",
        paddingBottom: "5px",
        borderRadius: "10px",
      }}
    >
      {Array.from({ length: numberOfLetters }).map((_, i) => (
        <Shake key={i} animate={invalidWord}>
          <Flip delay={i * 300} animate={storedGuess?.submitted}>
            <Letter
              borderColor={getBorderColor(guess[i])}
              bgColor={getBGColor(i)}
              textColor={inputTextColor}
              height={gameWordLength <= 5 ? '50px' : '35px'}
              width={gameWordLength <= 5 ? '50px' : '35px'}
            >
              {guess[i] || ""}
            </Letter>
          </Flip>
        </Shake>
      ))}
    </fieldset>
  );
};

export default Line;

const Letter = styled("span", {
  shouldForwardProp: (props) =>
    !["bgColor", "textColor", "borderColor", "shake"].includes(props),
})((p) => ({
  width: p.width,
  height: p.height,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  caretColor: "transparent",
  margin: "0 2px",
  border: `2px solid ${p.borderColor}`,
  borderRadius: "5px",
  fontSize: "35px",
  backgroundColor: p.bgColor,
  color: p.textColor,
}));