import { Deserializer } from 'jsonapi-serializer'
import { toastr } from 'react-redux-toastr'

import UserService from '~/services/UserService'

import { createApiAction, createAction, throwError } from '~/state/utils'

// Action constants
export const FETCH_PROGRAMS_FOR_CLIENT = createApiAction(
  'admin / clients / FETCH_PROGRAMS_FOR_CLIENT'
)
export const SET_PROGRAMS = 'admin / clients / SET_PROGRAMS'

export const setPrograms = createAction(SET_PROGRAMS)

export const getProgramsForClient = (id, message) =>
  UserService.thunk(FETCH_PROGRAMS_FOR_CLIENT, async (_, dispatch) => {
    const { program: programData } = await UserService.getProgramsById(id)

    const tasksMappedToPrograms = {}
    const data = await new Deserializer({
      keyForAttribute: 'snake_case',

      transform: async programItem => {
        const {
          tasks,
          program: programSerialized,
          id: programId,
          ...rest
        } = programItem
        const deserializer = new Deserializer({
          keyForAttribute: 'snake_case',
        })

        const taskData = await deserializer.deserialize(tasks)
        const program = await deserializer.deserialize(programSerialized)

        tasksMappedToPrograms[programId] = taskData
        return { program, id: programId, ...rest }
      },
    }).deserialize(programData)

    dispatch(setPrograms({ programs: tasksMappedToPrograms }, message))

    return { data }
  })

export const assignClientToProgram = ({
  client_id,
  ...values
}) => async dispatch => {
  try {
    const {
      data: { message },
    } = await UserService.createClientProgram({
      program: { ...values },
      client_id,
    })

    await dispatch(getProgramsForClient(client_id, message))
  } catch (err) {
    throwError(err)
  }
}

export const unassingClientFromProgram = (client_id, id) => async dispatch => {
  try {
    await UserService.deleteClientProgram(id, { client_id })
    await dispatch(getProgramsForClient(client_id))
    toastr.success('Success', 'Program was removed from client')
  } catch (err) {
    throwError(err)
  }
}
