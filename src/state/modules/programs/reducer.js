import {
  createReducer,
  fetchAndSetApiAction,
  successApiAction,
} from '~/state/utils'
import {
  FETCH_PROGRAMS,
  CREATE_PROGRAM,
  FETCH_PROGRAM_BY_ID,
  SET_NAME,
  DELETE_PROGRAM,
} from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  name: null,
  nutrition_id: null,
  id: null,
}

const programsReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH_PROGRAMS),
  ...successApiAction(CREATE_PROGRAM),
  ...successApiAction(FETCH_PROGRAM_BY_ID),
  ...successApiAction(SET_NAME),
  [DELETE_PROGRAM]: (state, { payload }) => ({
    ...state,
    data: state.data.filter(({ id }) => id !== payload.id),
  }),
})

export default programsReducer
