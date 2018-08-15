import { Future, futureOfArray, hasLength, ifElse, request } from '../helpers'
const { encase, rejectAfter } = Future
const API = 'https://api.datamuse.com/'

export const getLyrics = word => char =>
  request(`${API}words?rel_trg=${word}&sp=${char}*&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

const getRhymes = word => char =>
  request(`${API}words?rel_rhy=${word}&sp=${char}*&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const getSuggestion = input =>
  request(`${API}sug?s=${input}&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeLyrics = word => char =>
  getLyrics(word)(char).chain(
    json => (hasLength(json) ? Future.of(json) : getRhymes(word)(char))
  )

export const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)
