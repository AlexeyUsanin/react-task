import { createReducer, fetchAndSetApiAction } from '~/state/utils'
import { FETCH } from './actions'

const initialState = {
  data: {
    goal: {},
    measures: [],
    programs: [],
  },
  loading: false,
  loaded: false,
}

const clientDashboardReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH),
})

export default clientDashboardReducer
