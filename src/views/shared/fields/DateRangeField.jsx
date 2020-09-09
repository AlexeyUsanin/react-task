import React, { useState, useCallback } from 'react'
import { DateRangePicker } from '@material-ui/pickers'
import { change } from 'redux-form'
import { TextField, FormHelperText, FormControl, Grid } from '@material-ui/core'

const DateRangeField = ({
  input: { onChange },
  meta: { touched, error, dispatch, form },
  displayError,
  startInputProps,
  endInputProps,
  className,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState([null, null])
  const [isOpen, setIsOpen] = useState(false)

  const errorMessage = (touched && error) || displayError

  const handleChange = useCallback(
    date => {
      setSelectedDate(date)
      dispatch(change(form, startInputProps.name, date[0]?.format()))
      dispatch(change(form, endInputProps.name, date[1]?.format()))

      if (!!date[0] && !!date[1]) {
        onChange(true)
        setIsOpen(false)
      } else onChange(false)
    },
    [dispatch, endInputProps.name, form, onChange, startInputProps.name]
  )

  return (
    <FormControl fullWidth>
      <DateRangePicker
        calendars={2}
        disableToolbar
        rightArrowButtonProps={{ color: 'secondary' }}
        leftArrowButtonProps={{ color: 'secondary' }}
        value={selectedDate}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        inputFormat="DD.MM.YYYY"
        onChange={handleChange}
        {...rest}
        renderInput={(startProps, endProps) => (
          <Grid container spacing={2} className={className}>
            <Grid item xs={6}>
              <TextField
                {...startProps}
                error={!!errorMessage}
                fullWidth
                helperText=""
                autoComplete="off"
                {...startInputProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...endProps}
                error={!!errorMessage}
                fullWidth
                helperText=""
                autoComplete="off"
                {...endInputProps}
              />
            </Grid>
          </Grid>
        )}
      />
      {!!errorMessage && (
        <FormHelperText variant="filled" error>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default DateRangeField
