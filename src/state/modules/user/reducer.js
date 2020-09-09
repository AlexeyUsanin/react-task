import { createReducer } from '../../utils'
import { LOGIN } from './actions'

const initialState = {
  jwt: null,
  exp: null,
  role: null,
}

const userReducer = createReducer(initialState)({
  [LOGIN]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
})

export default userReducer
