import React, { useCallback } from 'react'
import { TextField as TextInput } from '@material-ui/core'

const TextField = ({
  input: { onChange, ...input },
  meta: { touched, error },
  displayError,
  required,
  readOnly,
  small,
  typeNumber,
  helperStandard,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError

  const handleNumberChange = useCallback(
    e => {
      const maxValue = 1000000
      const targetValue = Math.abs(Number(e.target.value) || '')
      const num = targetValue > maxValue ? maxValue : targetValue
      onChange(num)
    },
    [onChange]
  )

  return (
    <TextInput
      variant="outlined"
      error={!!errorMessage}
      helperText={errorMessage}
      InputLabelProps={{ required }}
      inputProps={{ 'data-required': required, readOnly }}
      onChange={typeNumber ? handleNumberChange : onChange}
      {...input}
      {...rest}
    />
  )
}

export default TextField
