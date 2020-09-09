import React from 'react'
import { useHistory } from 'react-router-dom'

import { Menu, MenuItem, Typography } from '@material-ui/core'

const MoreMenu = ({ anchorEl, handleCloseMenu, menuData }) => {
  const history = useHistory()

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={!!anchorEl}
      onClose={event => {
        event.stopPropagation()
        handleCloseMenu()
      }}
      PaperProps={{
        style: {
          width: 200,
          backgroundColor: '#2D2F33',
        },
      }}
    >
      {menuData.map(({ label, path, onClick, id }) => (
        <MenuItem
          key={label}
          dense
          onClick={event => {
            event.preventDefault()

            if (onClick) onClick(id)
            if (path) history.push(path)

            handleCloseMenu()
          }}
        >
          <Typography noWrap>{label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default MoreMenu
