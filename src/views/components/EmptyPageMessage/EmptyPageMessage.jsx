import React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography } from '@material-ui/core'

const EmptyPageMessage = ({ name, message }) => (
  <Box
    height="calc(100vh - 315px)"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Typography color="textSecondary">
      {message || `You have no ${name} yet`}
    </Typography>
  </Box>
)

EmptyPageMessage.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
}

EmptyPageMessage.defaultProps = {
  name: '',
  message: '',
}

export default EmptyPageMessage
