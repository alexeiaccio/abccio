import { createActions } from 'redux-actions'
import { Future, request } from '../helpers'
const { encase } = Future

const { poop } = createActions('POOP')

const getPoop = word => request(`https://api.datamuse.com/words?ml=${word}&max=10`)
  .map(res => res.body)
  .chain(encase(JSON.parse))

export const makePoop = payload =>
  dispatch => {
    dispatch(poop([payload]))
    getPoop(payload)
      .fork(console.error, 
        res => dispatch(poop(res))
      )
  }
  