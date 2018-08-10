/* global window:true */
/* eslint no-underscore-dangle: 0 */

import { createStore as reduxCreateStore } from "redux"
import { reducers } from '../reducers'

const createStore  = () => {
  const devtools =
    process.env.NODE_ENV === 'development' && typeof window !== `undefined` && window.devToolsExtension 
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  return reduxCreateStore(reducers, devtools)
}

export default createStore