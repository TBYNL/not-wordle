import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material'

const isLetter = (char) => char.toUpperCase() !== char.toLowerCase() || char.codePointAt(0) > 127;

const Line = ({ onSubmit, previousLineSubmitted, submitted, setSubmitted, word }) => {
  const wordChars = [...word].map((char, index) => {
    return {
      char,
      position: index + 1
    }
  });

  const letterOneRef = useRef(null);
  const letterTwoRef = useRef(null);
  const letterThreeRef = useRef(null);
  const letterFourRef = useRef(null);
  const letterFiveRef = useRef(null);
  
  const [currentLetterRef, setCurrentLetterRef] = useState(letterOneRef);
  const [letterOne, setLetterOne] = useState("");
  const [letterTwo, setLetterTwo] = useState("");
  const [letterThree, setLetterThree] = useState("");
  const [letterFour, setLetterFour] = useState("");
  const [letterFive, setLetterFive] = useState("");

  const setNewLetter = (e, setLetter, ref) => {
    const letter = e.target.value;

    if (isLetter(letter)) {
      setLetter(letter.toUpperCase());
      if (ref) {
        setCurrentLetterRef(ref)
      }
    }
  }

  const onKeyDown = (e, setLetter, prevRef, prevLetter, setPrevLetter) => {
    if (e.keyCode === 8) {
      setLetter("");
      if (prevRef) {
        setCurrentLetterRef(prevRef)

        if (prevLetter) {
          setPrevLetter("");
        }
      }
    }
    if (e.keyCode === 9) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (e.keyCode === 13) {
      if (letterOne !== "" && letterTwo !== "" && letterThree !== "" && letterFour !== "" && letterFive !== "") {
        const letters = [letterOne, letterTwo, letterThree, letterFour, letterFive];

        onSubmit(letters, setSubmitted);
      }
    }
  } 

  const handleUserKeyPressUnfocused = useCallback((e) => {
    currentLetterRef?.current?.focus();
  }, [currentLetterRef]);

  const letterStyle = {
      width: '50px', 
      pointerEvents: 'none', 
      caretColor: 'transparent',
  }

  const getColour = (letter, position) => {
    let color = 'white';

    if (word.includes(letter)) {
      color = 'yellow';

      if (wordChars.find(char => char.position === position).char === letter) {
        color = 'green';
      }
    }

    if (!submitted) {
      color = 'white'
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

  return (
    <fieldset disabled={submitted || !previousLineSubmitted} style={{ border: 'none' }}>
      <TextField
        style={letterStyle}
        inputProps={
          { 
            maxLength: 1, 
            onKeyDown: e => onKeyDown(e, setLetterOne),
          }
        }
        value={letterOne}
        onChange={e => setNewLetter(e, setLetterOne, letterTwoRef)} 
        inputRef={letterOneRef}
        sx={{ input: { color: getColour(letterOne, 1) } }}
        autoFocus
      />
      <TextField
        style={letterStyle}
        inputProps={
          { 
            maxLength: 1, 
            // handle backspace and tab
            onKeyDown: e => onKeyDown(e, setLetterTwo, letterOneRef, letterOne, setLetterOne) 
          }
        }
        value={letterTwo}
        onChange={e => setNewLetter(e, setLetterTwo, letterThreeRef)} 
        inputRef={letterTwoRef}
        sx={{ input: { color: getColour(letterTwo, 2) } }}
      />
      <TextField
        style={letterStyle}
        inputProps={
          { 
            maxLength: 1, 
            // handle backspace and tab
            onKeyDown: e => onKeyDown(e, setLetterThree, letterTwoRef, letterTwo, setLetterTwo) 
          }
        }
        value={letterThree}
        onChange={e => setNewLetter(e, setLetterThree, letterFourRef)} 
        inputRef={letterThreeRef}
        sx={{ input: { color: getColour(letterThree, 3) } }}
      />
      <TextField
        style={letterStyle}
        inputProps={
          { 
            maxLength: 1, 
            // handle backspace and tab
            onKeyDown: e => onKeyDown(e, setLetterFour, letterThreeRef, letterThree, setLetterThree) 
          }
        }
        value={letterFour}
        onChange={e => setNewLetter(e, setLetterFour, letterFiveRef)} 
        inputRef={letterFourRef}
        sx={{ input: { color: getColour(letterFour, 4) } }}
      />
      <TextField
        style={letterStyle}
        inputProps={
          { 
            maxLength: 1, 
            // handle backspace and tab
            onKeyDown: e => onKeyDown(e, setLetterFive, letterFourRef, letterFour, setLetterFour) 
          }
        }
        value={letterFive}
        onChange={e => setNewLetter(e, setLetterFive)} 
        inputRef={letterFiveRef}
        sx={{ input: { color: getColour(letterFive, 5) } }}
      />
    </fieldset>
  );
}

export default Line;
