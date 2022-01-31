import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../hooks/useStore';

const Modal = ({ showModal, onClose, title, description, children }) => {
  const bgColor = useStore(state => state.getBGColor());
  const textColor = useStore(state => state.getTextColor);

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2}} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: textColor,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={showModal}
      PaperProps={{ style: { backgroundColor: bgColor, color: textColor() }}}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {description}
        </Typography>
        <DialogActions>
          {children}
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Modal;