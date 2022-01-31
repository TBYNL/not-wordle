import { memo } from 'react';
import { styled } from "@mui/material/styles";
import Slider from '@mui/material/Slider';

const LetterModeSlider = styled(Slider, {
  shouldForwardProp: (props) =>
    !["textColor"].includes(props),
  })((p) => ({
    // '& .MuiSwitch-switchBase': {
    // },
    '& .MuiSlider-thumb': {
      backgroundColor: '#ed6c02',
    },
    '& .MuiSlider-track': {
      border: 'none',
      backgroundColor: '#417505',
    },
    '& .MuiSlider-markLabel': {
      color: p.textColor
    }
}));

export default memo(LetterModeSlider);