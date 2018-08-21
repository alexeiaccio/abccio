import Future from 'fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import * as R from 'ramda'
import request from 'request-fluture'
import { create, env } from 'sanctuary'
import $ from 'sanctuary-def'
import * as uuid from 'uuid/v1'

import cyrilicToLatin from './cyrilicToLatin'

const S = create({
  checkTypes: true,
  env: env.concat(flutureEnv),
})

export const { assoc, concat, empty, F, mergeWith, replace } = R

export const {
  chain,
  compose,
  flip,
  fromMaybe,
  get,
  gt,
  head,
  I,
  ifElse,
  is,
  joinWith,
  map,
  pipe,
  prop,
  splitOn,
  test,
  unless,
  words,
} = S

export { Future, request, R, S, uuid, $ }

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

export const futureOfArray = compose(Future.of)(Array.from)

export const gtTen = pipe([get(is($.Number))('length'), fromMaybe(0), gt(9)])

export const hasLength = pipe([
  get(is($.Number))('length'),
  fromMaybe(0),
  gt(0),
])

export const randomNum = max => Math.floor(Math.random() * max)

export const randomWord = xs =>
  R.pathOr('', [randomNum(S.size(xs)), 'word'], xs)

export const stringHead = pipe([splitOn(''), head, fromMaybe('')])

export const splitString = splitOn('')

export const trimSpace = replace(/\s|-/, empty)

export const trimString = pipe([words, head, fromMaybe(''), trimSpace])
