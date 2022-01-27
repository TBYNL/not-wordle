import React, { useRef } from "react";
import { default as SimpleKeyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useStore } from "../../hooks/useStore";
import "./keyboard.css";

export const Keyboard = ({ correctLetters, outOfPositionLetters, incorrectLetters }) => {
  const layoutName = "default";
  const keyboard = useRef();
  const setOnScreenKeyPressed = useStore(state => state.setOnScreenKeyPressed);
  const darkMode = useStore(state => state.darkMode ? "dark" : "light");

  const onKeyPress = button => {
    setOnScreenKeyPressed(button);

    const timer = setTimeout(() => {
      setOnScreenKeyPressed('');
    }, 100);
    return () => clearTimeout(timer);
  }

  return (
    <SimpleKeyboard
      keyboardRef={r => (keyboard.current = r)}
      theme={`hg-theme-default myTheme1 ${darkMode}`}
      layoutName={layoutName}
      onKeyPress={button => onKeyPress(button)}
      layout={{
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "Enter Z X C V B N M {bksp}",
        ],
      }}
      display={{
        "{bksp}": "⌫",
      }}
      buttonTheme={[
        { 
          class: darkMode,
          buttons: "Q W E R T Y U I O P A S D F G H J K L Enter Z X C V B N M {bksp}"
        },
        {
          class: "hg-red",
          buttons: ` ${incorrectLetters.join(" ")}`
        },
        {
          class: "hg-yellow",
          buttons: ` ${outOfPositionLetters.join(" ")}`
        },
        {
          class: "hg-green",
          buttons: ` ${correctLetters.join(" ")}`
        }
      ]}
    />
  );
}

