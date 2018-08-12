import Future from 'fluture'
import request from 'request-fluture'
import {
  env as flutureEnv
} from 'fluture-sanctuary-types'
import {
  create,
  env
} from 'sanctuary'
import $ from 'sanctuary-def'
import cyrilicToLatin from './cyrilicToLatin'

const S = create({
  checkTypes: true,
  env: env.concat(flutureEnv)
})

export const {
  compose,
  flip,
  fromMaybe,
  get,
  gt,
  ifElse,
  is,
  joinWith,
  map,
  pipe,
  prop,
  splitOn,
  test,
  unless
} = S

export {
  Future,
  request,
  S,
}

export const hasLength = compose(gt(0))(prop('length'))
export const futureOfArray = compose(Future.of)(Array.from)

const trslt = library =>
  unless(test(/[a-zA-Z0-9]/))(
    pipe([
      splitOn(''),
      map(flip(get(is($.String)))(library)),
      map(fromMaybe('')),
      joinWith('')
    ])
  )

export const fromCyrilicToLatin = trslt(cyrilicToLatin)