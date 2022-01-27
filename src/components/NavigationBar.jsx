import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import { useStore } from '../hooks/useStore';
import { styled } from "@mui/material/styles";

export const NavigationBar = () => {
  const { darkMode, setDarkMode, winStreak, bestStreak, setModalDetails, textColor } = useStore(state => ({ 
    darkMode: state.darkMode, 
    setDarkMode: state.setDarkMode,
    winStreak: state.winStreak,
    bestStreak: state.bestStreak,
    setModalDetails: state.setModalDetails,
    textColor: state.textColor()
  }));

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const ProfileModalContent = () => {
    return (
      <>
        <div>
          Current win streak: {winStreak}
        </div>
          <div>
          Best streak: {bestStreak}
        </div>
      </>
    );
  }

  const handleMenu = () => {
    setModalDetails({
      title: 'Profile',
      description: 'Here is your data',
      show: true,
      children: <ProfileModalContent />
    })
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <AppBar position="static" sx={{ backgroundColor: '#417505' }}>
        <Toolbar>
          <FormGroup sx={{ maxWidth: '10%', color: textColor }}>
            <DarkModeSwitch
              checked={darkMode}
              onChange={handleChange}
              aria-label="login switch"
              color='warning'
            />
          </FormGroup>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: textColor }}>
            !Wordle
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ color: '#C0C0C0' }}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

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
        backgroundColor: darkMode ? '#8796A5' : '##ed6c02',
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
    backgroundColor: darkMode ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));