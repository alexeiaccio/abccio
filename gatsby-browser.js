/* globals window */

import React from 'react'
import { hydrate } from 'emotion'
import { Provider } from 'react-redux'

import createStore from './src/state/'
const store = createStore()

export const wrapRootComponent = ({ Root }) => {
  const ConnectedRootComponent = () => (
    <Provider store={store}>
      <Root />
    </Provider>
  )

  return ConnectedRootComponent
}

export const onClientEntry = () => {
  if (
    /* eslint-disable no-underscore-dangle */
    typeof window !== `undefined` &&
    typeof window.__EMOTION_CRITICAL_CSS_IDS__ !== `undefined`
  ) {
    hydrate(window.__EMOTION_CRITICAL_CSS_IDS__)
  }
}