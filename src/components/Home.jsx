import React, { useEffect, useState } from 'react';
import { Words, RandomWord } from '../words'
import { Keyboard } from './Keyboard/Keyboard';
import Line from './Line';
import { styled } from "@mui/material/styles";
import { useStore } from '../hooks/useStore';
import { Button } from '@mui/material';

const Home = () => {
  const [allWords] = useState(Words);
  const [word] = useState(RandomWord.toUpperCase()) 

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

  const { bgColor, setModalDetails, winStreak, setWinStreak, bestStreak, setBestStreak } = useStore(state => (
    { 
      bgColor: state.bgColor, 
      setModalDetails: state.setModalDetails,
      winStreak: state.winStreak,
      setWinStreak: state.setWinStreak,
      bestStreak: state.bestStreak,
      setBestStreak: state.setBestStreak
    }
  ));

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
    let wordGuess = letters.join("");
    let updatedCorrectLetters = correctLetters;
    let updatedIncorrectLetters = incorrectLetters;
    let updatedOutOfPositionLetters = outOfPositionLetters;

    const wordChars = [...word].map((char, index) => {
      return {
        char,
        position: index + 1
      }
    });

    if (!allWords.includes(wordGuess.toLowerCase())) {
      return;
    }

    letters.forEach((letter, index) => {
      if (word.includes(letter)) {
        if (wordChars.find(char => char.position === index + 1).char === letter) {
          // correct
          updatedCorrectLetters.push(letter);
          setCorrectLetters(updatedCorrectLetters);

          if (updatedOutOfPositionLetters.includes(letter)) {
            updatedOutOfPositionLetters = updatedOutOfPositionLetters.filter(oopLetter => oopLetter !== letter)
            setOutOfPositionLetters(updatedOutOfPositionLetters);
          }
        } else {
          if (!updatedCorrectLetters.includes(letter)) {
            // correct + out of position
            updatedOutOfPositionLetters.push(letter);
            setOutOfPositionLetters(updatedOutOfPositionLetters);
          }
        }
      } else {
        // incorrect
        updatedIncorrectLetters.push(letter);
        setIncorrectLetters(updatedIncorrectLetters);
      }
    });

    // is correct
    if (wordGuess === word) {
      setAllLinesSubmitted();
      setWordGuessed(true);
      console.log("Hooray");

      const updatedWinStreak = winStreak + 1;

      setWinStreak(updatedWinStreak);

      if (updatedWinStreak > bestStreak) {
        debugger;
        setBestStreak(updatedWinStreak);
      }
    } else {
        setLineSubmitted(true);
        setCurrentLetterRef(null);
        document.activeElement.blur();
        setTotalGuesses(totalGuesses + 1);
    }
  }

  const getNewWord = () => {
    window.location.reload();
  }

  useEffect(() => {
    if (!wordGuessed && totalGuesses === 6) {
      setModalDetails({
        title: 'Unlucky mate',
        description: `The word was: ${word}`,
        show: true,
        children: <Button variant="contained" onClick={getNewWord}>Get new word</Button>
      });
      setWinStreak(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordGuessed, totalGuesses])

  return (
    <HomeWrapper bgColor={bgColor}>
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
    </HomeWrapper>
  );
}

const HomeWrapper = styled("div", {
  shouldForwardProp: (props) =>
    props !== "bgColor"
  })((p) => ({
    backgroundColor: p.bgColor,
    textAlign: 'center'
}));

export default Home;
