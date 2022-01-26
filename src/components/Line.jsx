import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";
import { FadeIn } from "./Animation/FadeIn";

const Line = ({
  id,
  onSubmit,
  previousLineSubmitted,
  submitted,
  storedGuess,
  word,
}) => {
  const [guess, setGuess] = useState(storedGuess || []);

  const onScreenKeyPressed = useStore((state) => state.onScreenKeyPressed);
  const inputTextColor = useStore((state) => state.textColor());

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
      if (guess.length === 5) {
        onSubmit(guess, id);
      }
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

          if (wordChars.find((char) => char.position === index).char === letter) {
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
          <Letter hasValue={guess[i]} bgColor={getBGColor(i)} textColor={inputTextColor}>
            {guess[i] || ""}
          </Letter>
        </FadeIn>
      ))}
    </fieldset>
  );
};

export default Line;

const Letter = styled("span", {
  shouldForwardProp: (props) => !["bgColor", "textColor", "hasValue"].includes(props),
})((p) => ({
  width: "50px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  caretColor: "transparent",
  margin: "0 2px",
  border: `2px solid ${p.hasValue ? '#417505' : p.textColor}`,
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

