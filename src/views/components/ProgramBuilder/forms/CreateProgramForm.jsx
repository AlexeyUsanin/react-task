import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'redux-form'
import { Button, makeStyles } from '@material-ui/core'
import TextField from '~/views/shared/fields/TextField'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CreateProgramForm = ({ handleSubmit }) => {
  const classes = useStyles()

  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="program"
        label="Program name"
        name="name"
        component={TextField}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
      >
        Create Program
      </Button>
    </Form>
  )
}

CreateProgramForm.propTypes = {
  handleSubmit: PropTypes.func,
}

CreateProgramForm.defaultProps = {
  handleSubmit: () => {},
}

export default CreateProgramForm
