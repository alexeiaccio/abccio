import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
//import { createFlutureMiddleware } from 'redux-fluture'
import thunk from 'redux-thunk'

import { reducers } from './reducers'

export default () => {
  const store = reduxCreateStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers.js')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}