import React, { useState } from 'react';
import { TextField } from '@mui/material'

const Letter = ({ setCurrentLetterRef, ref, nextLetterRef, previousLetterRef }) => {
  const [letter, setLetter] = useState("");

  const onKeyDown = (e, setLetter, prevRef, prevLetter, setPrevLetter) => {
    if (e.keyCode === 8) {
      setLetter("");
      // ref?.current?.focus();
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
  } 
  
  return (
    <TextField
      style={{ width: '50px', pointerEvents: 'none', caretColor: 'transparent' }}
      inputProps={
        { 
          maxLength: 1, 
          onKeyDown: e => onKeyDown(e, setLetter, previousLetterRef) 
        }
      }
      value={letter}
      onChange={e => setNewLetter(e, setLetterOne, nextLetterRef)} 
      inputRef={ref}
      autoFocus
    />
  );
}

export default Letter;
