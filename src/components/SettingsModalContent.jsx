import React from 'react';
import Grid from "@mui/material/Grid";
// import Modal from './Modal';
import { useStore } from '../hooks/useStore';
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from '@mui/material/Switch';
import LetterModeSlider from './controls/LetterModeSlider';

const SettingsModalContent = () => {
  const { darkMode, setDarkMode, bgColor, textColor, gameWordLength, setGameWordLength } = useStore(state => ({ 
    darkMode: state.darkMode, 
    setDarkMode: state.setDarkMode,
    bgColor: state.getBGColor(),
    textColor: state.getTextColor(),
    gameWordLength: state.gameWordLength,
    setGameWordLength: state.setGameWordLength,
  }));

  const handleChangeDarkMode = (event) => {
    setDarkMode(event.target.checked);
  };

  const getSliderValueText = (value) => {
    return `${value} letters`;
  }

  const letterMarks = [
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid justifyContent="center">
        <Item>
            <FormControlLabel 
              label="Dark Mode"
              labelPlacement="start"
              control={
                <DarkModeSwitch
                  key={darkMode}
                  checked={darkMode}
                  onChange={handleChangeDarkMode}
                  aria-label="dark mode switch"
                  color='warning'
                />
              }
            />
        </Item>
        <Item color={textColor} backgroundColor={bgColor}>
            <FormControlLabel 
              sx={{ width: '100%', alignItems: 'flex-start' }} 
              label="Word length" 
              labelPlacement="top"
              control={
                <LetterModeSlider
                  defaultValue={5}
                  getAriaValueText={getSliderValueText}
                  step={1}
                  value={parseInt(gameWordLength)}
                  onChange={(e) => setGameWordLength(e.target.value)}
                  marks={letterMarks}
                  min={4}
                  max={7}
                  textColor={textColor}
                />
              } 
            />
        </Item>
      </Grid>
    </Grid>
  );
};

const Item = styled("div", {
  shouldForwardProp: (props) =>
    !["backgroundColor"].includes(props),
})((p) => ({
  display: 'flex',
  color: p.color,
  backgroundColor: p.backgroundColor,
  borderColor: p.color,
  minWidth: '250px',
  marginBottom: '15px'
}));

const DarkModeSwitch = styled(Switch)(({ darkMode }) => ({
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translate(6px, 6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translate(22px, 6px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: darkMode ? '#8796A5' : '#ed6c02',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: darkMode ? '#8796A5' : '#ed6c02',
    width: 24,
    height: 24,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#417505',
    borderRadius: 20 / 2,
  },
}));

export default SettingsModalContent;
