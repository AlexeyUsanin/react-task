import React, { useState, useEffect } from 'react'

import { DatePicker } from '@material-ui/pickers'
import { TextField, InputAdornment } from '@material-ui/core'
import { CalendarTodayOutlined } from '@material-ui/icons'

import moment from 'moment'

const DatePickerField = ({
  input: { onChange, value },
  meta: { touched, error },
  displayError,
  label,
  name,
  datePickerProp,
}) => {
  const [selectedDate, handleDateChange] = useState(moment(value || undefined))
  const errorMessage = (touched && error) || displayError
  const date = new Date()
  const minDate = date.setFullYear(date.getFullYear() - 1)
  const maxDate = date.setFullYear(date.getFullYear() + 15)

  useEffect(() => {
    onChange(selectedDate?.format('DD.MM.YYYY'))
  }, [onChange, selectedDate])

  return (
    <DatePicker
      disableToolbar
      variant="inline"
      rightArrowButtonProps={{ color: 'secondary' }}
      leftArrowButtonProps={{ color: 'secondary' }}
      value={selectedDate}
      onChange={handleDateChange}
      inputFormat="DD.MM.YYYY"
      minDate={minDate}
      maxDate={maxDate}
      desktopModeMediaQuery="@media (max-width: 320px)"
      ToolbarComponent={() => null} // To hide toolbar on mobile
      {...datePickerProp}
      renderInput={inputProps => (
        <TextField
          {...inputProps}
          fullWidth
          label={label}
          name={name}
          variant="outlined"
          error={!!errorMessage}
          helperText={errorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayOutlined />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default DatePickerField
