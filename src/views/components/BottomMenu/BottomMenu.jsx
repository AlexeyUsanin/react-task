import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'

import { MoreHoriz } from '@material-ui/icons'

import Sidebar from '../Sidebar'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 25,
    borderTop: '1px solid #BDBDBD',
    '& svg': {
      color: '#989AA1',
    },
    '& .active': {
      '& svg': {
        color: '#fff',
      },
    },
  },
})

const BottomMenu = ({ bottomLinks, sidebarLinks }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        {bottomLinks.map(({ Icon, path }) => (
          <BottomNavigationAction
            key={path}
            icon={<Icon color="secondary" />}
            component={NavLink}
            to={path}
          />
        ))}
        <BottomNavigationAction
          icon={<MoreHoriz color="secondary" />}
          onClick={() => setOpen(true)}
        />
      </BottomNavigation>

      <Sidebar
        open={open}
        sidebarLinks={sidebarLinks}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

BottomMenu.propTypes = {
  bottomLinks: PropTypes.arrayOf(
    PropTypes.shape({ Icon: PropTypes.element, path: PropTypes.string })
  ).isRequired,
  sidebarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.element,
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
}

export default memo(BottomMenu)
