import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../hooks/useStore';
import { styled } from '@mui/material/styles';

export const Modal = ({ showModal, onClose, title, description, content, children }) => {
  const bgColor = useStore(state => state.bgColor());
  const textColor = useStore(state => state.textColor);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(3),
      borderColor: 'grey'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    // '& .MuiPaper-root': {
    //   color: textColor  
    // }
  }));
  
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
              color: textColor(),
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <div>
      <BootstrapDialog
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
          {/* <DialogActions>
            {children}
          </DialogActions> */}
      </BootstrapDialog>
    </div>
  )
}
