import { createReducer, fetchAndSetApiAction } from '~/state/utils'

import { FETCH_DASHBOARD } from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
}

const dashboardReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH_DASHBOARD),
})

export default dashboardReducer
