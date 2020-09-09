import { createReducer, fetchAndSetApiAction } from '~/state/utils'
import { FETCH_CLIENTS } from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
}

const adminClientsReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH_CLIENTS),
})

export default adminClientsReducer
