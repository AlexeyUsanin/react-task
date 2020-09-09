import React from 'react'
import PropTypes from 'prop-types'

import { Box, CircularProgress } from '@material-ui/core'

const Loader = ({ marginY }) => (
  <Box display="flex" justifyContent="center" my={marginY}>
    <CircularProgress color="secondary" />
  </Box>
)

Loader.propTypes = {
  marginY: PropTypes.number,
}

Loader.defaultProps = {
  marginY: 2,
}

export default Loader
