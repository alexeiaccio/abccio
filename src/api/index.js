import {
  concat,
  Future,
  futureOfArray,
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

const getFollowers = getFabric('rel_bga')

const getTriggers = getFabric('rel_trg')

const getHomophone = getFabric('rel_hom')

const getRhymes = getFabric('rel_rhy')

const getSoundLike = getFabric('sl')

const getSpelledLike = word => char =>
  request(`${API}words?sp=${char}*&topics=${word}&qe=topics&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeLyrics = word => char =>
  Future.of(a => b => c => d => e => f => concat(a, b, c, d, e, f))
    .ap(getTriggers(word)(char))
    .ap(getRhymes(word)(char))
    .ap(getFollowers(word)(char))
    .ap(getHomophone(word)(char))
    .ap(getSoundLike(word)(char))
    .ap(getSpelledLike(word)(char))

const getSuggestion = input =>
  request(`${API}sug?s=${input}&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)
