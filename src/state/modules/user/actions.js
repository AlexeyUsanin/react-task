import jwtDecode from 'jwt-decode'
import { Deserializer } from 'jsonapi-serializer'

import UserService from '~/services/UserService'
import LocalStorage from '~/services/LocalStorage'
import { STORAGE, TIMEOUT, ADMIN } from '~/utilities/constants'
import { getLocalLoggedStatus, setLocalUser } from './utils'

import { throwError } from '~/state/utils'
import history from '~/history'

// Action constants
export const LOGOUT = 'user / LOGOUT'
export const LOGIN = 'user / LOGIN'

export const loggedOut = () => ({
  type: LOGOUT,
})

export const authorize = (data, token) => async dispatch => {
  const storage = new LocalStorage()
  let decodedToken

  UserService.setAuthToken(token)

  if (token) {
    storage.add(STORAGE.authToken, token)
    decodedToken = jwtDecode(token)
  }

  dispatch({
    type: LOGIN,
    payload: {
      ...decodedToken,
      ...data,
      token,
    },
  })
}

export const logout = () => dispatch => {
  const storage = new LocalStorage()

  storage.clear()
  UserService.setAuthToken()

  history.push('/')

  dispatch(loggedOut())
}

export const login = (user, data) => async dispatch => {
  try {
    const resp = await UserService.login(user, data)
    const logged = getLocalLoggedStatus()
    const userType = user.slice(0, -1)
    const {
      data: { jwt },
    } = resp

    const payload = await new Deserializer({
      keyForAttribute: 'snake_case',
    }).deserialize(resp.data[userType])

    if (!logged) setLocalUser(jwt, TIMEOUT)

    await dispatch(authorize(payload, jwt))
  } catch (error) {
    throwError(error)
  }
}

export const refreshToken = token => async dispatch => {
  const logged = getLocalLoggedStatus()
  const user = jwtDecode(token)
  const { role } = user

  if (logged) {
    UserService.setAuthToken(token)
    try {
      const resp = await UserService.refreshToken(role)
      const {
        data: { jwt },
      } = resp

      const payload = await new Deserializer({
        keyForAttribute: 'snake_case',
      }).deserialize(resp.data[role])

      await dispatch(authorize(payload, jwt))
    } catch (error) {
      dispatch(logout())
      throwError(error)
    }
  } else {
    dispatch(logout())
  }
}

export const updateUser = ({ avatar, ...user }, id, role) => async () => {
  try {
    const newUser = user
    if (avatar) {
      newUser.avatar = avatar.signed_id
    } else {
      newUser.avatar = null
    }

    const updateRequest =
      role === ADMIN ? UserService.updateadmin : UserService.updateClient

    await updateRequest({ [role]: { ...newUser } }, id)
  } catch (error) {
    throwError(error)
  }
}
