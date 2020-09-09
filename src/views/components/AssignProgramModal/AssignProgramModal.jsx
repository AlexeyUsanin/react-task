import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { reduxForm, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { compose } from 'redux'

import ModalDialog from '~/views/shared/ModalDialog'

import { asyncValidate } from '~/views/utils/AsyncValidate'
import AssignProgramSchema from '~/schemas/assignProgram'

import { assignClientToProgram } from '~/state/modules/client/programs'

const AssignProgramForm = lazy(() =>
  import('~/views/components/AssignProgramForm')
)

const AssignProgramModal = ({ handleClose, open }) => (
  <ModalDialog open={open} handleClose={handleClose} title="Assign program">
    <Form handleClose={handleClose} />
  </ModalDialog>
)

const withForm = reduxForm({
  form: 'Assign_Program_Form',
  enableReinitialize: true,
  touchOnBlur: false,
  asyncValidate: asyncValidate(AssignProgramSchema),
  onSubmit: async (
    { program_id, ...values },
    dispatch,
    { match, handleClose }
  ) => {
    try {
      const client_id = match?.params?.id
      const data = { ...values, client_id, program_id: program_id.value }
      handleClose()
      await dispatch(assignClientToProgram(data))

      return values
    } catch (error) {
      throw new SubmissionError({ error: error.message })
    }
  },
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError) toastr.error('Error', errors?.error)
  },
})

const Form = compose(withRouter, withForm)(AssignProgramForm)

AssignProgramModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

AssignProgramModal.defaultProps = {
  open: false,
  handleClose: () => {},
}
export default AssignProgramModal
