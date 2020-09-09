import { createReducer, fetchAndSetApiAction } from '~/state/utils'

import { FETCH_TASKS } from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
}

const tasksReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH_TASKS),
})

export default tasksReducer
