import { string } from 'yup'

export const email = string()
  .email('Enter a valid email')
  .required('E-mail is required')

export const password = string().required('Password is required')

export const date = string()
  .notOneOf(['Invalid date'], 'Invalid date format')
  .required('Date is required')
