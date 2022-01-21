import React, { useRef } from "react";
import { default as SimpleKeyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useStore } from "../../hooks/useStore";
import "./keyboard.css";

export const Keyboard = ({ correctLetters, outOfPositionLetters, incorrectLetters}) => {
  const layoutName = "default";
  const keyboard = useRef();
  const setOnScreenKeyPressed = useStore(state => state.setOnScreenKeyPressed);
  const darkMode = useStore(state => state.darkMode ? "dark" : "light");

  // const onChange = input => {
  //   console.log("Input changed", input);
  // };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    setOnScreenKeyPressed(button);
  };

  return (
    <SimpleKeyboard
      keyboardRef={r => (keyboard.current = r)}
      theme={`hg-theme-default myTheme1 ${darkMode}`}
      layoutName={layoutName}
      // onChange={input => onChange(input)}
      onKeyPress={button => onKeyPress(button)}
      layout={{
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "Enter Z X C V B N M Backspace",
        ]
      }}
      buttonTheme={[
        { 
          class: darkMode,
          buttons: "Q W E R T Y U I O P A S D F G H J K L Enter Z X C V B N M Backspace"
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
