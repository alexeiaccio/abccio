import Future from 'fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import * as R from 'ramda'
import request from 'request-fluture'
import { create, env } from 'sanctuary'
import $ from 'sanctuary-def'

import cyrilicToLatin from './cyrilicToLatin'

const S = create({
  checkTypes: true,
  env: env.concat(flutureEnv),
})

export const { assoc, concat, mergeWith } = R

export const {
  chain,
  compose,
  flip,
  fromMaybe,
  get,
  gt,
  head,
  ifElse,
  is,
  joinWith,
  map,
  pipe,
  prop,
  splitOn,
  test,
  unless,
} = S

export { Future, request, R, S, $ }

export const hasLength = pipe([
  get(is($.Number))('length'),
  fromMaybe(0),
  gt(0),
])

export const futureOfArray = compose(Future.of)(Array.from)

const trslt = library =>
  unless(test(/[a-zA-Z0-9]/))(
    pipe([
      splitOn(''),
      map(flip(get(is($.String)))(library)),
      map(fromMaybe('')),
      joinWith(''),
    ])
  )

export const fromCyrilicToLatin = trslt(cyrilicToLatin)
export const randomNum = max => Math.floor(Math.random() * max)
export const randomWord = xs =>
  R.pathOr('', [randomNum(S.size(xs)), 'word'], xs)
export const stringHead = pipe([splitOn(''), head, fromMaybe('')])
export const splitString = splitOn('')
