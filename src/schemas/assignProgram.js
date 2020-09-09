import { object, string } from 'yup'
import { date } from './fields'

const AssignProgramSchema = object().shape({
  start_date: date,
  end_date: date,
  program_id: string().required('Program name is required'),
})

export default AssignProgramSchema
