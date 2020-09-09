import {
  createReducer,
  fetchAndSetApiAction,
  successApiAction,
} from '~/state/utils'
import { SET_PROGRAMS, FETCH_PROGRAMS_FOR_CLIENT } from './actions'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  programs: {},
}

const clientProgramsReducer = createReducer(initialState)({
  ...fetchAndSetApiAction(FETCH_PROGRAMS_FOR_CLIENT),
  ...successApiAction(SET_PROGRAMS),
})

export default clientProgramsReducer
