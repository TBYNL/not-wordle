import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import FormGroup from '@mui/material/FormGroup';
import { useStore } from '../hooks/useStore';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SettingsModalContent from './SettingsModalContent';

export const NavigationBar = () => {
  const { gamesPlayed, gamesWon, winStreak, bestStreak, setModalDetails, textColor } = useStore(state => ({ 
    gamesPlayed: state.gamesPlayed,
    gamesWon: state.gamesWon,
    winStreak: state.winStreak,
    bestStreak: state.bestStreak,
    setModalDetails: state.setModalDetails,
    textColor: state.getTextColor()
  }));

  const getWinPercentage = () => {
    if(gamesPlayed && gamesPlayed > 0) {
      if (gamesWon && gamesWon > 0) {
        return Math.round(gamesWon / gamesPlayed * 100)
      }
    } else {
      return 0
    }
  }

  const ProfileModalContent = () => {
    return (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <h2>{gamesPlayed || 0}</h2>
              Played
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <h2>{gamesWon || 0}</h2>
              Wins
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <h2>{getWinPercentage()}%</h2>
              Win %
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h2>{winStreak || 0}</h2>
              Current Streak
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
            <h2>{bestStreak || 0}</h2>
            Best streak
            </Item>
          </Grid>
        </Grid>
    );
  }

  const openProfile = () => {
    setModalDetails({
      title: 'Statistics',
      show: true,
      children: <ProfileModalContent />
    })
  };  
  
  const openSettings = () => {
    setModalDetails({
      title: 'Statistics',
      show: true,
      children: <SettingsModalContent />
    })
  };

  return (
    <>
      <AppBar position="static" sx={{ display: 'grid', backgroundColor: '#417505', justifyContent: 'center' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', maxWidth: '400px' }}>
          <FormGroup sx={{ color: textColor }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openSettings}
              sx={{ color: '#C0C0C0'}}
            >
              <Settings />
            </IconButton>
          </FormGroup>
          <Typography variant="h4" component="div" sx={{ color: textColor, textAlign: 'center', fontFamily: 'Staatliches', marginX: '50px' }}>
            !WORDLE
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openProfile}
              sx={{ color: '#C0C0C0' }}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: '50px',
  display: 'block'
}));
