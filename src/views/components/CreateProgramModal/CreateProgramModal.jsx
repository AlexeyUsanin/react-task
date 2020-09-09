import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { withRouter } from 'react-router-dom'

import { createProgram } from '~/state/modules/programs'
import ModalDialog from '../../shared/ModalDialog'

import { asyncValidate } from '~/views/utils/AsyncValidate'
import ProgramSchema from '../../../schemas/program'

const CreateProgramModal = props => (
  <ModalDialog {...props} title="Create program">
    <Form />
  </ModalDialog>
)

const withForm = reduxForm({
  form: 'Create_Program_Form',
  enableReinitialize: true,
  touchOnBlur: false,
  asyncValidate: asyncValidate(ProgramSchema),
  onSubmit: async (values, dispatch) => {
    try {
      const value = await dispatch(createProgram(values))
      return value
    } catch (error) {
      throw new SubmissionError({ error: error.message })
    }
  },
  onSubmitSuccess: ({ id, name }, dispatch, { history }) => {
    history.push(`/admin/program/${id}`, { name, id })
  },
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError) toastr.error('Error', errors?.error)
  },
})

const Form = compose(withRouter, withForm)

CreateProgramModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

CreateProgramModal.defaultProps = {
  open: false,
  handleClose: () => {},
}

export default memo(CreateProgramModal)
