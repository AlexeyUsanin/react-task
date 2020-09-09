import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { List, Box, TextField, makeStyles, ListItem } from '@material-ui/core'

import useAutocomplete from '@material-ui/lab/useAutocomplete'
import Loader from '~/views/shared/loaders/Loader'
import EmptyPageMessage from '~/views/components/EmptyPageMessage'

const useStyles = makeStyles(theme => ({
  inputField: {
    width: '100%',
  },
  list: {
    paddingTop: 0,
    marginTop: 5,
  },
  listItem: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
    borderRadius: 4,
    color: theme.palette.primary.main,
    '&.bordered': {
      border: '1px solid #BDBDBD',
    },
    '&.shadow': {
      boxShadow:
        '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14)',
    },
  },
  box: {
    paddingRight: 5,
    paddingLeft: 1,
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#F2F2F2',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-track': {
      height: '80%',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BDBDBD',
    },
  },
}))

const CardFilter = ({
  getOptionLabel,
  RenderComponent,
  options,
  hideSearch,
  loading,
  loaded,
  listItemProps,
  itemsName,
  ...rest
}) => {
  const { getInputProps, groupedOptions } = useAutocomplete({
    options,
    getOptionLabel,
  })
  const { onBlur, ...inputProps } = getInputProps()
  const classes = useStyles()
  const { bordered, component, path } = listItemProps
  const { style } = rest

  const renderSource = inputProps.value ? groupedOptions : options

  return (
    <>
      {!hideSearch && (
        <TextField
          variant="outlined"
          className={classes.inputField}
          {...inputProps}
          {...rest}
        />
      )}
      {renderSource.length > 0 && loaded ? (
        <Box
          mt={2}
          maxHeight="calc(100vh - 280px)"
          minHeight="200px"
          overflow="auto"
          className={classes.box}
          style={style}
        >
          <List className={classes.list}>
            {renderSource.map(option => (
              <ListItem
                id={option.id}
                to={`/admin/${path}/${option.id}`}
                component={component}
                key={option.id}
                underline="none"
                className={cx(classes.listItem, {
                  bordered,
                  shadow: !bordered,
                })}
              >
                <RenderComponent {...option} {...listItemProps} />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        loaded && <EmptyPageMessage name={itemsName} />
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        {loading && <Loader />}
      </Box>
    </>
  )
}

CardFilter.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  RenderComponent: PropTypes.elementType.isRequired,
  hideSearch: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  itemsName: PropTypes.string.isRequired,
  listItemProps: PropTypes.shape({
    selectable: PropTypes.bool,
    subtitle: PropTypes.bool,
    actionButton: PropTypes.bool,
    avatarVariant: PropTypes.string,
    bordered: PropTypes.bool,
    component: PropTypes.func,
    path: PropTypes.string.isRequired,
  }),
}

CardFilter.defaultProps = {
  options: [],
  hideSearch: false,
  getOptionLabel: ({ name }) => name,
  loading: false,
  loaded: false,
  listItemProps: {
    selectable: false,
    subtitle: false,
    actionButton: true,
    avatarVariant: 'circle',
    bordered: false,
    component: () => {},
  },
}

export default memo(CardFilter)
