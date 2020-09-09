import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  IconButton,
  useMediaQuery,
  Avatar,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import Navigation from '../Navigation'
import Link from '~/views/shared/Link'

const useStyles = makeStyles(theme => ({
  logoLink: {
    flexGrow: 1,
    height: 20,
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  withOnBack: {
    marginRight: 48,
  },
  userName: {
    marginLeft: theme.spacing(1),
  },
}))

const links = [
  {
    name: 'Dashboard',
    path: 'dashboard',
  },
  {
    name: 'Profile',
    path: 'profile',
  },
]

const DesktopNav = () => {
  const classes = useStyles()

  return (
    <Toolbar disableGutters>
      <Link className={classes.logoLink} to="/" />
      <Navigation links={links} />
    </Toolbar>
  )
}

const MobileNav = ({ title, onBack, name, img }) => {
  const classes = useStyles()

  return (
    <>
      <Toolbar disableGutters>
        <Avatar alt="Client photo" src={img} />
        <Typography noWrap className={classes.userName}>
          {name}
        </Typography>
      </Toolbar>
      {title && (
        <Toolbar disableGutters>
          {onBack && (
            <IconButton onClick={onBack}>
              <ArrowBack />
            </IconButton>
          )}
          <Typography
            variant="subtitle1"
            className={cx({
              [classes.title]: true,
              [classes.withOnBack]: !!onBack,
            })}
          >
            {title}
          </Typography>
        </Toolbar>
      )}
    </>
  )
}

const ClientHeader = ({ title, onBack, name, imgSrc }) => {
  const isTablet = useMediaQuery('(min-width:768px)')

  return (
    <MuiAppBar position="fixed">
      <Container>
        {isTablet ? (
          <DesktopNav />
        ) : (
          <MobileNav title={title} onBack={onBack} name={name} img={imgSrc} />
        )}
      </Container>
    </MuiAppBar>
  )
}

ClientHeader.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  name: PropTypes.string,
  imgSrc: PropTypes.string,
}

ClientHeader.defaultProps = {
  title: '',
  onBack: null,
  name: '',
  imgSrc: '',
}

const mapStateToProps = ({ user: { first_name, last_name, avatar } }) => ({
  name: `${first_name} ${last_name}`,
  imgSrc: avatar?.url,
})

export default connect(mapStateToProps)(ClientHeader)
