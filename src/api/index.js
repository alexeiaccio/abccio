import {
  Future,
  futureOfArray,
  gtTen,
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
  request(`${API}words?sp=${char}*&topics=${word}&md=p&max=10`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeLyrics = word => char =>
  getTriggers(word)(char)
    .chain(
      res =>
        gtTen(res)
          ? Future.of(res)
          : getRhymes(word)(char).map(x => x.concat(res))
    )
    .chain(
      res =>
        gtTen(res)
          ? Future.of(res)
          : getFollowers(word)(char).map(x => x.concat(res))
    )
    .chain(
      res =>
        gtTen(res)
          ? Future.of(res)
          : getHomophone(word)(char).map(x => x.concat(res))
    )
    .chain(
      res =>
        gtTen(res)
          ? Future.of(res)
          : getSoundLike(word)(char).map(x => x.concat(res))
    )
    .chain(
      res =>
        gtTen(res)
          ? Future.of(res)
          : getSpelledLike(word)(char).map(x => x.concat(res))
    )
    .chain(Future.of)

const getSuggestion = input =>
  request(`${API}sug?s=${input}&max=5`)
    .race(rejectAfter(1000, 'Timout error'))
    .map(res => res.body)
    .chain(encase(JSON.parse))

export const safeSuggestion = ifElse(hasLength)(getSuggestion)(futureOfArray)
