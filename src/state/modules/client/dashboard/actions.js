import { Deserializer } from 'jsonapi-serializer'

import UserService from '~/services/UserService'
import { createApiAction } from '~/state/utils'

export const FETCH = createApiAction('client_dashboard / FETCH_DATA')
export const GET_PROGRAM = createApiAction('client_dashboard / GET_PROGRAM')

export const getClientDashboard = () =>
  UserService.thunk(
    FETCH,
    async () => {
      const { goal, measures, program } = await UserService.getClientDashboard()
      const deserializer = new Deserializer({
        keyForAttribute: 'snake_case',
      })

      const goalData = await deserializer.deserialize(goal)
      const measuresData = await deserializer.deserialize(measures)

      const promises = program.map(deserializer.deserialize)
      const programData = await Promise.all(promises)

      return {
        data: { goal: goalData, measures: measuresData, programs: programData },
      }
    },
    {}
  )
