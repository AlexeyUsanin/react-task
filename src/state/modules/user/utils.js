import { STORAGE } from '../../../utilities/constants'
import LocalStorage from '../../../services/LocalStorage'

export const getLocalLoggedStatus = () => {
  const storage = new LocalStorage()
  const jwt = storage.get(STORAGE.authToken)
  const exp = storage.get(STORAGE.exp)

  return !!jwt && !!exp
}

export const setLocalUser = (jwt, exp) => {
  const expDate = new Date().getTime() + exp
  const storage = new LocalStorage()

  storage.add(STORAGE.authToken, jwt)
  storage.add(STORAGE.exp, expDate)
}
