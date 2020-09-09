import { Deserializer } from 'jsonapi-serializer'
import { toastr } from 'react-redux-toastr'
import history from '~/history'

import { createApiAction, createAction, throwError } from '~/state/utils'
import ProgramService from '~/services/UserService'

export const FETCH_PROGRAMS = createApiAction('programs / FETCH_PROGRAMS')
export const CREATE_PROGRAM = 'programs / CREATE_PROGRAM'
export const FETCH_PROGRAM_BY_ID = 'programs / FETCH_PROGRAM_BY_ID'
export const SET_NAME = 'programs / SET_NAME'
export const DELETE_PROGRAM = 'admin / clients / DELETE_PROGRAM'

export const createProgramAction = createAction(CREATE_PROGRAM)
export const fetchProgramById = createAction(FETCH_PROGRAM_BY_ID)
export const setName = createAction(SET_NAME)
export const deleteProgram = createAction(DELETE_PROGRAM)

export const getAllPrograms = () =>
  ProgramService.thunk(FETCH_PROGRAMS, async () => {
    const { program } = await ProgramService.getAllPrograms()
    const data = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(program)

    return { data }
  })

export const createProgram = name => async dispatch => {
  try {
    const {
      data: { program, message },
    } = await ProgramService.createProgram(name)
    const payload = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(program)

    await dispatch(createProgramAction(payload, message))

    return payload
  } catch (error) {
    throwError(error)
    return Promise.reject(error)
  }
}

export const getProgramById = id => async dispatch => {
  try {
    const { program } = await ProgramService.getProgramById(id)
    const data = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(program)

    dispatch(fetchProgramById(data))
  } catch (err) {
    await history.push('/admin/programs')
    await toastr.warning('Warning', "Can't find program")
  }
}

export const updateProgram = ({
  program_id,
  nutrition_id,
  name,
}) => async dispatch => {
  const {
    data: { program, message },
  } = await ProgramService.updateProgram(program_id, {
    program_id,
    nutrition_id,
    name,
  })

  const data = await new Deserializer({
    keyForAttribute: 'snake_case',
  }).deserialize(program)

  await dispatch(setName(data, message))
}

export const deleteProgramAction = id => async dispatch => {
  try {
    const {
      data: { message },
    } = await ProgramService.deleteProgram(id)

    await dispatch(deleteProgram({ id }, message))
  } catch (error) {
    throwError(error)
  }
}
