import { object, string } from 'yup'

const ProgramSchema = object().shape({
  name: string().required('Program name is required'),
})

export default ProgramSchema
