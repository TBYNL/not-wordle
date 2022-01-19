import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material'
import styled from 'styled-components';
import { useStore } from '../hooks/useStore';

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

  // const { 
  //   onScreenKeyPressed, 
  //   nextLetterRef, 
  //   setNextLetterRef, 
    
  //   previousLetterRef, 
  //   setPreviousLetterRef, 
    
  //   previousLetterSetter,
  //   setPreviousLetterSetter,
    
  //   currentLetterSetter, 
  //   setCurrentLetterSetter,

  //   nextLetterSetter, 
  //   setNextLetterSetter,
  // } = useStore(state => ({ 
  //   onScreenKeyPressed: state.onScreenKeyPressed,
  //   nextLetterRef: state.nextLetterRef,
  //   setNextLetterRef: state.setNextLetterRef,

  //   previousLetterRef: state.previousLetterRef, 
  //   setPreviousLetterRef: state.setPreviousLetterRef,

  //   currentLetterSetter: state.currentLetterSetter || setLetterOne,
  //   setCurrentLetterSetter: state.setCurrentLetterSetter,

  //   previousLetterSetter: state.previousLetterSetter || undefined,
  //   setPreviousLetterSetter: state.setPreviousLetterSetter,

  //   nextLetterSetter: state.nextLetterSetter || setLetterTwo,
  //   setNextLetterSetter: state.setNextLetterSetter,
  // }), shallow);

  const setNewLetter = (e, setLetter, nextRef, nextLetterSetter) => {
    const letter = e.target.value;

    if (isLetter(letter)) {
      setLetter(letter.toUpperCase());
      if (nextRef) {
        setCurrentLetterRef(nextRef)
        // setNextLetterRef(nextRef)
      }
      // if (nextLetterSetter) {
      //   setCurrentLetterSetter(nextLetterSetter);
      // }
    }
  }

  const onKeyDown = (e, letter, setLetter, prevRef, setPrevLetter) => {
    if (e.keyCode === 8) {
      setLetter("");
      if (letter === '' && prevRef) {
        setCurrentLetterRef(prevRef)

        if (letter === '' && setPrevLetter) {
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
      paddingTop: '15px',
      paddingBottom: '10px',
      fontSize: '20px' 
    }
  }

  const wordChars = [...word].map((char, index) => {
    return {
      char,
      position: index + 1
    }
  });

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

  useEffect(() => {
    debugger;
    if (onScreenKeyPressed) {
      console.log(onScreenKeyPressed);
    }
  }, [onScreenKeyPressed])

  // useEffect(() => {
  //   getLocalStorageValue(id)
  // }, [id])

  return (
    <fieldset disabled={submitted || !previousLineSubmitted} style={{ border: 'none' }}>
      <StyledTextField
        variant="standard"
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterOne, setLetterOne) }}
        value={letterOne}
        onChange={e => setNewLetter(e, setLetterOne, letterTwoRef)} 
        inputRef={letterOneRef}
        sx={{ input: { color: getColour(letterOne, 1) } }}
        autoFocus
      />
      <StyledTextField
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterTwo, setLetterTwo, letterOneRef, setLetterOne) }}
        value={letterTwo}
        onChange={e => setNewLetter(e, setLetterTwo, letterThreeRef)} 
        inputRef={letterTwoRef}
        sx={{ input: { color: getColour(letterTwo, 2) } }}
      />
      <StyledTextField
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterThree, setLetterThree, letterTwoRef, setLetterTwo) }}
        value={letterThree}
        onChange={e => setNewLetter(e, setLetterThree, letterFourRef)} 
        inputRef={letterThreeRef}
        sx={{ input: { color: getColour(letterThree, 3) } }}
      />
      <StyledTextField
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterFour, setLetterFour, letterThreeRef, setLetterThree) }}
        value={letterFour}
        onChange={e => setNewLetter(e, setLetterFour, letterFiveRef)} 
        inputRef={letterFourRef}
        sx={{ input: { color: getColour(letterFour, 4) } }}
      />
      <StyledTextField
        inputProps={{ ...inputProps, onKeyDown: e => onKeyDown(e, letterFive, setLetterFive, letterFourRef, setLetterFour) }}
        value={letterFive}
        onChange={e => setNewLetter(e, setLetterFive)} 
        inputRef={letterFiveRef}
        sx={{ input: { color: getColour(letterFive, 5) } }}
      />
    </fieldset>
  );
}

export default Line;

const StyledTextField = styled(TextField)`
  width: 50px; 
  pointer-events: none; 
  caret-color: transparent;
  outline: solid white thin;
  margin: 5px !important;
`