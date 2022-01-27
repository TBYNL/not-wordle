import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Words } from "../words";
import { useStore } from "../hooks/useStore";
import { FadeIn } from "./Animation/FadeIn";
import { Shake } from "./Animation/Shake";
import shallow from 'zustand/shallow';

const Line = ({
  id,
  onSubmit,
  previousLineSubmitted,
  submitted,
  storedGuess,
}) => {
  const [allWords] = useState(Words);
  const [invalidWord, setInvalidWord] = useState(false);

  const [guess, setGuess] = useState(storedGuess || []);

  const word = useStore((state) => state.word());

  const onScreenKeyPressed = useStore((state) => state.onScreenKeyPressed);
  const inputTextColor = useStore((state) => state.textColor());
  const darkMode = useStore((state) => state.darkMode);

  const onKeyDown = (e) => {
    if (submitted || !previousLineSubmitted) {
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

      if (!allWords.includes(wordGuess.toLowerCase()) || guess.length < 5) {
        setInvalidWord(true);
        return;
      }

      setInvalidWord(false);
      onSubmit(guess, id);
    }

    if (/^[a-z]$/.test(e.key.toLowerCase()) && guess.length < 5) {
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
      if (submitted) {
        const letter = guess[index];

        if (word.includes(letter)) {
          color = "#b8860b";

          if (
            wordChars.find((char) => char.position === index).char === letter
          ) {
            color = "#417505";
          }
        }

        if (!submitted) {
          color = "";
        }
      }

      return color;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submitted]
  );

  const getBorderColor = useCallback((value) => {
    if (invalidWord) {
      return "#e23636";
    }

    return value !== undefined ? "#417505" : inputTextColor;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, invalidWord]);

  useEffect(() => {
    if (onScreenKeyPressed && !submitted && previousLineSubmitted) {
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
  }, [guess.length, guess, previousLineSubmitted, submitted]);

  return (
    <fieldset
      disabled={submitted || !previousLineSubmitted}
      style={{
        border: "none",
        display: "flex",
        paddingTop: "2px",
        paddingBottom: "5px",
        borderRadius: "10px",
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <FadeIn key={i} delay={i * 100}>
          <Shake animate={invalidWord}>
            <Letter
              borderColor={getBorderColor(guess[i])}
              bgColor={getBGColor(i)}
              textColor={inputTextColor}
            >
              {guess[i] || ""}
            </Letter>
          </Shake>
        </FadeIn>
      ))}
    </fieldset>
  );
};

export default Line;

const Letter = styled("span", {
  shouldForwardProp: (props) =>
    !["bgColor", "textColor", "borderColor", "shake"].includes(props),
})((p) => ({
  width: "50px",
  height: "50px",
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

// const bounceAnimation = keyframes`${fadeIn}`;

// const BouncyDiv = styled.div`
//   animation: .8s ${bounceAnimation};
//   animation-delay: ${props => props.delay}s;
// `;
