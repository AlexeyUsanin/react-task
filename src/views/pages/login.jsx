import React from 'react'
import { compose } from 'redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

import AuthLayout from '../layouts/Auth'
import SignInForm from '../components/SignInForm'

import store from '../../state/store'
import { asyncValidate } from '../utils/AsyncValidate'
import { login } from '../../state/modules/user/actions'
import SignInSchema from '../../schemas/login'

const Login = () => (
  <AuthLayout>
    <Form />
  </AuthLayout>
)

const withForm = reduxForm({
  form: 'Signin_Form',
  enableReinitialize: true,
  touchOnBlur: false,
  asyncValidate: asyncValidate(SignInSchema),
  onSubmit: async (values, dispatch) => {
    const { userType } = values

    try {
      await dispatch(login(userType, values))
    } catch (error) {
      throw new SubmissionError({ error: error.message })
    }
  },
  onSubmitSuccess: (result, dispatch, { history }) => {
    const { user } = store.getState()

    history.push(`/${user.role}/dashboard`)
    toastr.success('Success', 'Successfully signed in')
  },
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError) toastr.error('Error', errors?.error)
  },
})

const Form = compose(withRouter, withForm)(SignInForm)

export default Login
