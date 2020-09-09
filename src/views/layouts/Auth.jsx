import React, { memo } from 'react'
import {
  Avatar,
  Typography,
  makeStyles,
  Container,
  Box,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    padding: '20px 15px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const AuthLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="subtitle1">
            Sign in
          </Typography>
          {children}
        </Box>
      </Box>
    </Container>
  )
}

export default memo(AuthLayout)
