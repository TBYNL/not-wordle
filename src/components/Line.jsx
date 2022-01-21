import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material'
import styled from 'styled-components';
import { useStore } from '../hooks/useStore';
import keyboardKey from 'keyboard-key';

const isLetter = (char) => char.toUpperCase() !== char.toLowerCase() || char.codePointAt(0) > 127;

// const getLocalStorageValue = (key) => {
//   // getting stored value
//   const saved = localStorage.getItem(key);
//   const initialValue = JSON.parse(saved);
//   return initialValue || "";
// }

const Line = ({ onSubmit, previousLineSubmitted, submitted, setSubmitted, word }) => {
  const letterOneRef = useRef(null);
  const letterTwoRef = useRef(null);
  const letterThreeRef = useRef(null);
  const letterFourRef = useRef(null);
  const letterFiveRef = useRef(null);
  
  const [currentLetterRef, setCurrentLetterRef] = useState(letterOneRef);
  const [letterOne, setLetterOne] = useState('');
  const [letterTwo, setLetterTwo] = useState('');
  const [letterThree, setLetterThree] = useState('');
  const [letterFour, setLetterFour] = useState('');
  const [letterFive, setLetterFive] = useState('');

  const onScreenKeyPressed = useStore(state => state.onScreenKeyPressed);
  const darkMode = useStore(state => state.darkMode);

  const inputTextColor = darkMode ? 'black' : '#EEEEEE';

  const setNewLetter = (e, setLetter, nextRef, nextLetterSetter) => {
    const letter = e.target.value;

    if (isLetter(letter)) {
      setLetter(letter.toUpperCase());
      if (nextRef) {
        setCurrentLetterRef(nextRef)
      }
    }
  }

  const onKeyDown = (e, letter, setLetter, prevRef, setPrevLetter) => {
    const key = keyboardKey.getCode(e);
    if (key === 8) {
      setLetter("");
      if (letter === '' && prevRef) {
        setCurrentLetterRef(prevRef)

        if (letter === '' && setPrevLetter) {
          setPrevLetter("");
        }
      }
    }
    if (key === 9) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (key === 13) {
      if (letterOne !== "" && letterTwo !== "" && letterThree !== "" && letterFour !== "" && letterFive !== "") {
        const letters = [letterOne, letterTwo, letterThree, letterFour, letterFive];

        onSubmit(letters, setSubmitted, setCurrentLetterRef);
      }
    }
  } 

  const handleUserKeyPressUnfocused = useCallback((e) => {
    currentLetterRef?.current?.focus();
  }, [currentLetterRef]);

  const inputProps = {
    maxLength: 1, 
    style: { 
      textAlign: 'center',    
      fontSize: '30px',
      fontWeight: 900
    }
  }

  const wordChars = [...word].map((char, index) => {
    return {
      char,
      position: index + 1
    }
  });

  const getColour = (letter, position) => {
    let color = darkMode ? '#EEEEEE' : 'rgba(0, 0, 0, 0.8)';

    if (word.includes(letter)) {
      color = '#edb95e';

      if (wordChars.find(char => char.position === position).char === letter) {
        color = '#82dd55';
      }
    }

    if (!submitted) {
      color = darkMode ? '#EEEEEE' : 'rgba(0, 0, 0, 0.8)'
    }
 
     return color;
  }

  useEffect(() => {
    if (currentLetterRef?.current) {
      currentLetterRef?.current?.focus(); 
    } else {
      letterOneRef.current.focus();
    }
  }, [currentLetterRef]);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPressUnfocused);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPressUnfocused);
    };
  }, [handleUserKeyPressUnfocused]);

  useEffect(() => {
    if (onScreenKeyPressed && previousLineSubmitted) {
      if (currentLetterRef?.current) {
        currentLetterRef?.current?.focus();
        var keyDown = new KeyboardEvent("keydown", {bubbles: true, cancelable: true, key: onScreenKeyPressed, keyCode: onScreenKeyPressed});

        document.activeElement.dispatchEvent(keyDown);

        // var onChange = new InputEvent("onchange", { target: { value: onScreenKeyPressed } })
        // document.activeElement.dispatchEvent(onChange);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreenKeyPressed])

  return (
    <fieldset disabled={submitted || !previousLineSubmitted} style={{ border: 'none' }}>
      <StyledTextField
        darkMode={darkMode}
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterOne, setLetterOne) }}
        value={letterOne}
        onChange={e => setNewLetter(e, setLetterOne, letterTwoRef)} 
        inputRef={letterOneRef}
        sx={{ input: { color: inputTextColor, backgroundColor: getColour(letterOne, 1) } }}
        autoFocus
      />
      <StyledTextField
        darkMode={darkMode}
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterTwo, setLetterTwo, letterOneRef, setLetterOne) }}
        value={letterTwo}
        onChange={e => setNewLetter(e, setLetterTwo, letterThreeRef)} 
        inputRef={letterTwoRef}
        sx={{ input: { color: inputTextColor, backgroundColor: getColour(letterTwo, 2) } }}
      />
      <StyledTextField
        darkMode={darkMode}
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterThree, setLetterThree, letterTwoRef, setLetterTwo) }}
        value={letterThree}
        onChange={e => setNewLetter(e, setLetterThree, letterFourRef)} 
        inputRef={letterThreeRef}
        sx={{ input: { color: inputTextColor, backgroundColor: getColour(letterThree, 3) } }}
      />
      <StyledTextField
        darkMode={darkMode}
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterFour, setLetterFour, letterThreeRef, setLetterThree) }}
        value={letterFour}
        onChange={e => setNewLetter(e, setLetterFour, letterFiveRef)} 
        inputRef={letterFourRef}
        sx={{ input: { color: inputTextColor, backgroundColor: getColour(letterFour, 4) } }}
      />
      <StyledTextField
        darkMode={darkMode}
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterFive, setLetterFive, letterFourRef, setLetterFour) }}
        value={letterFive}
        onChange={e => setNewLetter(e, setLetterFive)} 
        inputRef={letterFiveRef}
        sx={{ input: { color: inputTextColor, backgroundColor: getColour(letterFive, 5) } }}
      />
    </fieldset>
  );
}

export default Line;

const StyledTextField = styled(({ darkMode, ...props}) => <TextField {...props} />)`
  width: 50px; 
  pointer-events: none; 
  caret-color: transparent;
  outline: solid ${props => props.darkMode ? '#EEEEEE' : 'black'} thin;
  margin: 5px !important;
`;