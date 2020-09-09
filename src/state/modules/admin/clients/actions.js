import { Deserializer } from 'jsonapi-serializer'
import { toastr } from 'react-redux-toastr'
import history from '~/history'

import UserService from '~/services/UserService'

import { createApiAction } from '~/state/utils'

// Action constants
export const FETCH_CLIENTS = createApiAction('admin / clients / FETCH_DATA')
export const FETCH_CLIENT_BY_ID = createApiAction(
  'admin / clients / FETCH_CLIENT_BY_ID'
)

export const getadminClients = () =>
  UserService.thunk(FETCH_CLIENTS, async () => {
    const { client } = await UserService.adminGetClients()

    const data = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(client)

    return { data }
  })

export const loadClientById = async ({ id }) => {
  try {
    const { client } = await UserService.getClientById(id)

    const data = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(client)

    return data
  } catch (err) {
    await history.push('/admin/clients')
    await toastr.warning('Warning', "Can't find client")
    return Promise.reject(err)
  }
}
