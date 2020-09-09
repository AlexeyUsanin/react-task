import React, { useState, useCallback, memo, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import MoreMenu from '../MoreMenu'

const renderCheckbox = ({ input, id }) => (
  <FormControlLabel
    key={id}
    control={
      <Checkbox
        type="checkbox"
        name={`${input.name}[${id}]`}
        value={id}
        checked={input.value.indexOf(id) !== -1}
        onChange={event => {
          const newValue = [...input.value]

          if (event.target.checked) {
            newValue.push(id)
          } else {
            newValue.splice(newValue.indexOf(id), 1)
          }

          return input.onChange(newValue)
        }}
      />
    }
  />
)
const ItemCard = ({
  name,
  imgSrc,
  id,
  checked,
  onChange,
  ...listItemProps
}) => {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const {
    selectable,
    subtitle,
    actionButton,
    avatarVariant,
    handleDelete,
  } = listItemProps

  const handleOpenMenu = useCallback(event => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const menuData = useMemo(
    () => [
      {
        label: 'Delete',
        onClick: () => dispatch(handleDelete(id)),
      },
    ],
    [dispatch, handleDelete, id]
  )

  return (
    <>
      {selectable && (
        <Field name="exercise_ids" component={renderCheckbox} id={id} />
      )}

      <ListItemIcon>
        <Avatar alt="item" src={imgSrc} variant={avatarVariant} />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={subtitle || null}
        secondaryTypographyProps={{ color: 'secondary' }}
      />

      {actionButton && (
        <ListItemSecondaryAction>
          <IconButton onClick={handleOpenMenu} color="secondary">
            <MoreVert />
          </IconButton>
          <MoreMenu
            anchorEl={anchorEl}
            handleCloseMenu={handleCloseMenu}
            menuData={menuData}
          />
        </ListItemSecondaryAction>
      )}
    </>
  )
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  hideMenu: PropTypes.bool,
  secondary: PropTypes.bool,
  checked: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
}

ItemCard.defaultProps = {
  hideMenu: false,
  secondary: false,
  checked: false,
  id: null,
  imgSrc: null,
  onChange: () => {},
}

export default memo(ItemCard)
