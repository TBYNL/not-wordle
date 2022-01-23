import React from 'react';
import { Modal as MUIModal, Box, Typography } from '@mui/material';

export const Modal = ({ showModal, onClose, title, description, children }) => {
  
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
    <MUIModal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ color: '#e23636'}}>
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        {children}
      </Box>
    </MUIModal>
  )
}
