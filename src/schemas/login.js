import { object } from 'yup'

import { email, password } from './fields'

const SignInSchema = object().shape({
  email,
  password,
})

export default SignInSchema
