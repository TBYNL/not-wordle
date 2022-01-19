import React, { useEffect, useState } from 'react';
import { Words, RandomWord } from '../words'
import { Keyboard } from './Keyboard/Keyboard';
import Line from './Line';
import { Button, Modal, Box, Typography } from '@mui/material';

// const getLocalStorageValue = (key) => {
//   // getting stored value
//   const saved = localStorage.getItem(key);
//   const initialValue = JSON.parse(saved);
//   return initialValue || "";
// }

const Home = () => {
  const [allWords] = useState(Words);
  const [word] = useState(RandomWord.toUpperCase()) 
  // const [lettersUsed, setLettersUsed] = useState([]);
  const [lineOneSubmitted, setLineOneSubmitted] = useState(false);
  const [lineTwoSubmitted, setLineTwoSubmitted] = useState(false);
  const [lineThreeSubmitted, setLineThreeSubmitted] = useState(false);
  const [lineFourSubmitted, setLineFourSubmitted] = useState(false);
  const [lineFiveSubmitted, setLineFiveSubmitted] = useState(false);
  const [lineSixSubmitted, setLineSixSubmitted] = useState(false);

  const [correctLetters, setCorrectLetters] = useState([]);
  const [outOfPositionLetters, setOutOfPositionLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  const [wordGuessed, setWordGuessed] = useState(false);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const setAllLinesSubmitted = () => {
    setLineOneSubmitted(true);
    setLineTwoSubmitted(true);
    setLineThreeSubmitted(true);
    setLineFourSubmitted(true);
    setLineFiveSubmitted(true);
    setLineSixSubmitted(true);
  }

  const onSubmitLine = (letters, setLineSubmitted, setCurrentLetterRef) => {
    // let storedValues = {
    //   id: id, 
    //   values: [],
    //   submitted: false
    // };
    let wordGuess = '';
    let updatedCorrectLetters = correctLetters;
    let updatedIncorrectLetters = incorrectLetters;
    let updatedOutOfPositionLetters = outOfPositionLetters;

    const wordChars = [...word].map((char, index) => {
      return {
        char,
        position: index + 1
      }
    });

    letters.forEach((letter, index) => {
      wordGuess+=letter;
      // storedValues.values[index] = { key: index + 1, value: letter }
      if (word.includes(letter)) {
        if (wordChars.find(char => char.position === index + 1).char === letter) {
          updatedCorrectLetters.push(letter);
          setCorrectLetters(updatedCorrectLetters);
        } else {
          if (!updatedCorrectLetters.includes(letter)) {
            updatedOutOfPositionLetters.push(letter);
            setOutOfPositionLetters(updatedOutOfPositionLetters);
          }
        }
      } else {
        updatedIncorrectLetters.push(letter);
        setIncorrectLetters(updatedIncorrectLetters);
      }
    });

    if (wordGuess === word) {
      setAllLinesSubmitted();
      setWordGuessed(true);
      console.log("Hooray");
    } else {
      if (allWords.includes(wordGuess.toLowerCase())) {
        // const lettersUsedArray = [...lettersUsed, ...letters]

        // setLettersUsed([...new Set(lettersUsedArray)]);
        setLineSubmitted(true);
        setCurrentLetterRef(null);
        document.activeElement.blur();
        setTotalGuesses(totalGuesses + 1);
        // storedValues.submitted = true;
        // localStorage.setItem(`${id}`, JSON.stringify(storedValues));
      }
    }
  }

  const getNewWord = () => {
    window.location.reload(true);
  }

  // useEffect(() => {
  //   setLineOneSubmitted(getLocalStorageValue(1)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(2)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(3)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(4)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(5)?.values?.submitted || false);
  // }, []);

  useEffect(() => {
    if (!wordGuessed && totalGuesses === 6) {
      setShowModal(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordGuessed, totalGuesses])
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ pointerEvents: false, backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
      <h1>Not Wordle</h1>
      {/* <div style={{ color: 'white' }}>{word}</div> */}
      {/* <div>{lettersUsed.map(letter => letter)}</div> */}
      <Line 
        onSubmit={onSubmitLine} 
        previousLineSubmitted={true}
        submitted={lineOneSubmitted}
        setSubmitted={setLineOneSubmitted}
        word={word}
      />
      <Line 
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineOneSubmitted}
        submitted={lineTwoSubmitted}
        setSubmitted={setLineTwoSubmitted}
        word={word}
      />      
      <Line 
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineTwoSubmitted}
        submitted={lineThreeSubmitted}
        setSubmitted={setLineThreeSubmitted}
        word={word}
      />      
      <Line 
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineThreeSubmitted}
        submitted={lineFourSubmitted}
        setSubmitted={setLineFourSubmitted}
        word={word}
      />      
      <Line 
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineFourSubmitted}
        submitted={lineFiveSubmitted}
        setSubmitted={setLineFiveSubmitted}
        word={word}
      />      
      <Line
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineFiveSubmitted}
        submitted={lineSixSubmitted}
        setSubmitted={setLineSixSubmitted}
        word={word}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Keyboard
          correctLetters={correctLetters}
          outOfPositionLetters={outOfPositionLetters}
          incorrectLetters={incorrectLetters}
        />
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ color: '#e23636'}}>
            Unlucky mate
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The word was {word}
          </Typography>
          <div>
            <Button variant="contained" onClick={getNewWord}>Get new word</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
