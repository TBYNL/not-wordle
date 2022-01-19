import React, { useState } from 'react';
import { Words, RandomWord } from '../words'
import { Keyboard } from './Keyboard/Keyboard';
import Line from './Line';

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
      console.log("Hooray");
    } else {
      if (allWords.includes(wordGuess.toLowerCase())) {
        // const lettersUsedArray = [...lettersUsed, ...letters]

        // setLettersUsed([...new Set(lettersUsedArray)]);
        setLineSubmitted(true);
        setCurrentLetterRef(null);
        document.activeElement.blur();
        // storedValues.submitted = true;
        // localStorage.setItem(`${id}`, JSON.stringify(storedValues));
      }
    }
  }

  // useEffect(() => {
  //   setLineOneSubmitted(getLocalStorageValue(1)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(2)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(3)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(4)?.values?.submitted || false);
  //   setLineOneSubmitted(getLocalStorageValue(5)?.values?.submitted || false);
  // }, []);
  
  return (
    <div style={{ pointerEvents: false, backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
      <h1>Not Wordle</h1>
      {/* <div style={{ color: 'white' }}>{word}</div> */}
      {/* <div>{lettersUsed.map(letter => letter)}</div> */}
      <Line 
        id={1}
        onSubmit={onSubmitLine} 
        previousLineSubmitted={true}
        submitted={lineOneSubmitted}
        setSubmitted={setLineOneSubmitted}
        word={word}
      />
      <Line 
        id={2}
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineOneSubmitted}
        submitted={lineTwoSubmitted}
        setSubmitted={setLineTwoSubmitted}
        word={word}
      />      
      <Line 
        id={3}
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineTwoSubmitted}
        submitted={lineThreeSubmitted}
        setSubmitted={setLineThreeSubmitted}
        word={word}
      />      
      <Line 
        id={4}
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineThreeSubmitted}
        submitted={lineFourSubmitted}
        setSubmitted={setLineFourSubmitted}
        word={word}
      />      
      <Line 
        id={5}
        onSubmit={onSubmitLine} 
        previousLineSubmitted={lineFourSubmitted}
        submitted={lineFiveSubmitted}
        setSubmitted={setLineFiveSubmitted}
        word={word}
      />      
      <Line
        id={6} 
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
    </div>
  );
}

export default Home;
