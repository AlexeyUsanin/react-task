import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'
import Link from '~/views/shared/Link'

const ClientList = ({ listData }) => (
  <List component="nav">
    {listData.map(({ avatar, first_name, last_name, id }) => (
      <ListItem
        disableGutters
        key={first_name}
        component={Link}
        to={`/admin/client/${id}`}
      >
        <ListItemAvatar>
          <Avatar color="primary" src={avatar?.url} />
        </ListItemAvatar>
        <ListItemText primary={`${first_name} ${last_name}`} />
      </ListItem>
    ))}
  </List>
)

ClientList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object),
}

ClientList.defaultProps = {
  listData: [],
}
export default memo(ClientList)
