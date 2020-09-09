import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import ThunkMiddleware from 'redux-thunk'

import * as reducers from './modules'
import { toastrMiddleware } from './middlewares'

const composeEnhancer = composeWithDevTools({})

const rootReducer = (state, action) => combineReducers(reducers)(state, action)

export default createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware, toastrMiddleware))
)
