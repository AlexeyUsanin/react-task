import React from 'react'
import { connect } from 'react-redux'

import { Typography, Box } from '@material-ui/core'

import AdminLayout from './admin'
import ClientLayout from './client'

import { ADMIN } from '~/utilities/constants'

const Error = ({ role }) => {
  const errorMessage = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="55vh"
    >
      <Typography variant="subtitle1" align="center">
        Oops something went wrong! Try to reload page!
      </Typography>
    </Box>
  )

  if (role === ADMIN) {
    return <AdminLayout title="Error">{errorMessage}</AdminLayout>
  }
  return <ClientLayout title="Error">{errorMessage}</ClientLayout>
}

export default connect(({ user }) => ({ role: user?.role }))(Error)
