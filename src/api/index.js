import { Future, request } from '../helpers'
const { encase } = Future

export const getSuggestion = input => request(`https://api.datamuse.com/sug?s=${input}&max=10`)
  .map(res => res.body)
  .chain(encase(JSON.parse))