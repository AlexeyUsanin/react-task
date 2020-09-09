import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'redux-form'
import {
  Button,
  FormControlLabel,
  Checkbox,
  makeStyles,
  CircularProgress,
} from '@material-ui/core'

import TextField from '../../shared/fields/TextField'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignInForm = ({ handleSubmit, submitting }) => {
  const classes = useStyles()

  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
      <Field
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        component={TextField}
        autoComplete="email"
      />
      <Field
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        component={TextField}
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="secondary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
      >
        {submitting ? <CircularProgress /> : 'Sign In'}
      </Button>
    </Form>
  )
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
}

SignInForm.defaultProps = {
  handleSubmit: () => {},
  submitting: false,
}

export default memo(SignInForm)
