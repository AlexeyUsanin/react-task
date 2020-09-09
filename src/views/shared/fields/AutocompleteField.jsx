import React, { useCallback, useMemo, useState, useEffect } from 'react'

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const AutocompleteField = ({
  input: { onChange, value, ...input },
  meta: { touched, error },
  id,
  displayError,
  options: customOptions = [],
  loadOptions,
  onClear,
  label,
  placeholder,
  inputProps,
  required,
  ...rest
}) => {
  const [options, setOptions] = useState(customOptions)
  const errorMessage = (touched && error) || displayError

  useEffect(() => {
    setOptions(customOptions)
  }, [customOptions])

  const handleChange = useCallback(
    (_e, v) => {
      if (!v && onClear) onClear()
      onChange(v || null)
    },
    [onChange, onClear]
  )

  const defaultValue = useMemo(() => {
    if ((typeof value === 'string' || typeof value === 'number') && !!options) {
      return options.find(v => v.value === value.toString())
    }
    return value
  }, [options, value])

  return (
    <Autocomplete
      id={id}
      onChange={handleChange}
      options={options}
      getOptionSelected={option => option.value === value.value}
      getOptionLabel={option => option.label}
      value={defaultValue || null}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          error={!!errorMessage}
          helperText={errorMessage}
          InputLabelProps={{ required }}
          inputProps={{
            ...input,
            ...params.inputProps,
            ...inputProps,
          }}
          fullWidth
        />
      )}
      {...rest}
    />
  )
}

export default AutocompleteField
