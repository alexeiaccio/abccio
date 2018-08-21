import {
  Future,
  futureOfArray,
  gtFour,
  hasLength,
  ifElse,
  request,
} from '../helpers'
const { encase, rejectAfter } = Future
const API = 'https://api.datamuse.com/'

const getFabric = type => word => char =>
  request(`${API}words?${type}=${word}&sp=${char}*&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

const getAproximateRhymes = getFabric('rel_nry')

const getTriggers = getFabric('rel_trg')

const getHomophone = getFabric('rel_hom')

const getRhymes = getFabric('rel_rhy')

const getSoundLike = getFabric('sl')

const getSpelledLike = word => char =>
  request(`${API}words?sp=${char}*&topics=${word}&qe=topics&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

const getSuggestion = input =>
  request(`${API}sug?s=${input}&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeLyrics = word => char =>
  getTriggers(word)(char)
    .chain(json => (gtFour(json) ? Future.of(json) : getRhymes(word)(char)))
    .chain(
      json => (gtFour(json) ? Future.of(json) : getAproximateRhymes(word)(char))
    )
    .chain(json => (gtFour(json) ? Future.of(json) : getHomophone(word)(char)))
    .chain(json => (gtFour(json) ? Future.of(json) : getSoundLike(word)(char)))
    .chain(
      json => (gtFour(json) ? Future.of(json) : getSpelledLike(word)(char))
    )

export const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)
