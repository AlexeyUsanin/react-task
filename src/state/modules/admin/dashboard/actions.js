import { Deserializer } from 'jsonapi-serializer'

import UserService from '~/services/UserService'

import { createApiAction } from '~/state/utils'

export const FETCH_DASHBOARD = createApiAction('admin / FETCH_DASHBOARD')

export const getadminDashboard = () =>
  UserService.thunk(FETCH_DASHBOARD, async () => {
    const {
      clients_without_program,
      last_program_ends_in_a_week,
      new_clients_without_program,
    } = await UserService.getadminDashboard()

    const newClientsWithoutProgram = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(new_clients_without_program)

    const clientsWithoutProgram = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(clients_without_program)

    const lastProgram = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(last_program_ends_in_a_week)

    return {
      data: { newClientsWithoutProgram, clientsWithoutProgram, lastProgram },
    }
  })
