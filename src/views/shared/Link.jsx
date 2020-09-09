import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Link as MuiLink, makeStyles } from '@material-ui/core'
import cx from 'classnames'

const useStyles = makeStyles(theme => ({
  inheritColor: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  disabled: {
    pointerEvents: 'none',
  },
}))

const Link = ({ inherit, children, disabled, ...props }) => {
  const classes = useStyles()

  return (
    <MuiLink
      component={RouterLink}
      className={cx({
        [classes.inheritColor]: inherit,
        [classes.disabled]: disabled,
      })}
      {...props}
    >
      {children}
    </MuiLink>
  )
}

export default Link
