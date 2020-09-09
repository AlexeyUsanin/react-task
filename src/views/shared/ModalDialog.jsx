import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    padding: theme.spacing(3),
    maxWidth: 750,
    width: '100%',
    outline: 'none',
  },
}))

const ModalDialog = ({ open, handleClose, title, children }) => {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      disableEnforceFocus
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {title && <Typography variant="subtitle2">{title}</Typography>}
            <IconButton onClick={handleClose} color="secondary">
              <Close />
            </IconButton>
          </Box>
          {children}
        </div>
      </Fade>
    </Modal>
  )
}

ModalDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ModalDialog.defaultProps = {
  open: false,
  handleClose: () => {},
  title: '',
}

export default ModalDialog
