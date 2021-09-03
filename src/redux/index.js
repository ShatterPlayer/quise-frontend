import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const inDev = process.env.NODE_ENV === 'development'
const middleware = [thunk]
inDev && middleware.push(logger)

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
)

export default store
