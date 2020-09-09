import React, { useRef, useEffect, useState } from 'react'

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  ListSubheader,
  Select,
} from '@material-ui/core'

const SelectField = ({
  input: { value, ...input },
  meta: { touched, error },
  label,
  options,
  name,
  displayError,
  required,
  defaultValue,
  ...rest
}) => {
  const errorMessage = (touched && error) || displayError
  const selectLabelRef = useRef(null)

  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    setLabelWidth(selectLabelRef.current.offsetWidth + 10)
  }, [])

  useEffect(() => {
    if (!value) {
      input.onChange(defaultValue)
    }
  }, [defaultValue, input, value])

  return (
    <FormControl variant="outlined" fullWidth error={!!errorMessage}>
      <InputLabel ref={selectLabelRef} id={name} required={required}>
        {label}
      </InputLabel>

      <Select
        labelId={name}
        value={value}
        labelWidth={labelWidth}
        {...input}
        {...rest}
      >
        {options.map(item =>
          item?.subTitle ? (
            <ListSubheader>{item.subTitle}</ListSubheader>
          ) : (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          )
        )}
      </Select>
      {!!errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default SelectField
