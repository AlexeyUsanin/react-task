import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Link as MuiLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { logout } from '~/state/modules/user'

const useStyles = makeStyles({
  navigationMenu: {
    display: 'flex',
    flexGrow: '3',
    justifyContent: 'space-between',
  },
})

const Navigation = ({ links, role }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <nav className={classes.navigationMenu}>
      {links.map(({ name, path }) => (
        <MuiLink
          key={name}
          component={NavLink}
          to={`/${role}/${path}`}
          underline="none"
        >
          {name}
        </MuiLink>
      ))}
      <MuiLink onClick={() => dispatch(logout())} underline="none">
        Logout
      </MuiLink>
    </nav>
  )
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.exact({ name: PropTypes.string, path: PropTypes.string })
  ).isRequired,
  role: PropTypes.string.isRequired,
}

export default connect(({ user: { role } }) => ({ role }))(Navigation)
