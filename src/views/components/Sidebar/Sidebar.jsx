import React from 'react'
import { useDispatch, connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  SwipeableDrawer,
  Box,
  List,
  Divider,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Link from '~/views/shared/Link'

import { logout } from '~/state/modules/user'

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
  },
  drawerMenu: {
    width: 250,
  },
  box: {
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(1),
  },
  linkItem: {
    color: theme.palette.primary.main,
  },
}))

const Sidebar = ({
  open,
  onClose,
  onOpen,
  name,
  imgSrc,
  sidebarLinks,
  role,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <div>
      <SwipeableDrawer
        open={open}
        className={classes.drawer}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Box className={classes.drawerMenu}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            className={classes.box}
            component={Link}
            to={`/${role}/profile`}
          >
            <Avatar alt="Cindy Baker" src={imgSrc} />
            <Typography variant="subtitle2" className={classes.title}>
              {name}
            </Typography>
          </Box>
          <Divider light />
          <List>
            {sidebarLinks.map(({ name: linkName, path, Icon }) => (
              <ListItem button divider component={Link} to={path} key={path}>
                <ListItemIcon>
                  <Icon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={linkName} className={classes.linkItem} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
          flex="1"
        >
          <Divider light />

          <ListItem button onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <ExitToAppIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  sidebarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.element,
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  role: PropTypes.string.isRequired,
}

Sidebar.defaultProps = {
  open: false,
  imgSrc: '',
  onClose: () => {},
  onOpen: () => {},
}

const mapStateToProps = ({
  user: { first_name, last_name, avatar, role },
}) => ({
  name: `${first_name} ${last_name}`,
  imgSrc: avatar?.url,
  role,
})

export default connect(mapStateToProps)(Sidebar)
