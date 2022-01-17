import React, { useState } from 'react';
import { Words, RandomWord } from '../words'
import Line from './Line';

const Home = () => {
  const [allWords] = useState(Words);
  const [word] = useState(RandomWord.toUpperCase()) 
  const [lettersUsed, setLettersUsed] = useState([]);
  const [lineOneSubmitted, setLineOneSubmitted] = useState(false);
  const [lineTwoSubmitted, setLineTwoSubmitted] = useState(false);
  const [lineThreeSubmitted, setLineThreeSubmitted] = useState(false);
  const [lineFourSubmitted, setLineFourSubmitted] = useState(false);
  const [lineFiveSubmitted, setLineFiveSubmitted] = useState(false);
  const [lineSixSubmitted, setLineSixSubmitted] = useState(false);

  const onSubmitLine = (letters, setLineSubmitted) => {
    let wordGuess = '';
    letters.forEach(letter => {
      wordGuess+=letter;
    });

    if (allWords.includes(wordGuess.toLowerCase())) {
      const lettersUsedArray = [...lettersUsed, ...letters]

      setLettersUsed([...new Set(lettersUsedArray)]);
      setLineSubmitted(true);
    }
  }
  
  return (
    <div style={{ pointerEvents: false, backgroundColor: 'black' }}>
      <div style={{ color: 'white' }}>{word}</div>
      <div>{lettersUsed.map(letter => letter)}</div>
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
    </div>
  );
}

export default Home;
