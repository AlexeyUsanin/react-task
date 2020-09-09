import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { Box } from '@material-ui/core'

import ClientLayout from '~/views/layouts/client'
import ProfileCard from '../../components/ProfileCard'
import { CLIENT } from '~/utilities/constants'
import { updateUser } from '~/state/modules/user/actions'

const Profile = ({ user }) => (
  <ClientLayout title="Profile">
    <Box mt={2}>
      <ProfileForm user={user} />
    </Box>
  </ClientLayout>
)

const mapStateToProps = ({ user }) => ({
  initialValues: {
    avatar: user.avatar,
  },
  user,
})
const withConnect = connect(mapStateToProps)

const withForm = reduxForm({
  form: 'Profile_Form',
  onSubmit: async (values, dispatch, { user: { id, ...user } }) => {
    try {
      await dispatch(updateUser({ ...user, ...values }, id, CLIENT))
    } catch (error) {
      throw new SubmissionError({
        _error: error.message,
      })
    }
  },
  onSubmitSuccess: () => {
    toastr.success('Success', 'Profile was updated')
  },
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError) toastr.error('Error', errors?.error)
  },
})

const ProfileForm = compose(withConnect, withForm)(ProfileCard)

export default Profile
