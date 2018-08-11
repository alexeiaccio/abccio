import React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'

import { makePoop } from '../state/actions'
import Layout from '../components/layout'
//import { Future, request, S } from '../helpers'

const IndexPage = connect(
  ({ poop }) => ({ poop }),
  { makePoop }
)(({ makePoop, poop }) => {
  /* console.log(S.I(Future.of(1)))
  request('https://api.datamuse.com/words?ml=ringing+in+the+ears')
    .fork(
      error => console.error('Oh no!', error),
      response => console.log('Got a response!', response)
    ) */
  
  return (
    <Layout>
      <h1>Hi people</h1>
      <input type="text" placeholder="Poop?"/>
      <button 
        onClick={() => makePoop('soil')}
      >Now go build something great.</button>
      <div>
      {poop && poop.map(({ word, score, tags }, i) =>
        <p key={i}>
          <Link key={word} to={`/`}>{ word }</Link>
          <span key={score}> { score }</span>
        </p>
      )}
      </div>
    </Layout>
  )
})

export default IndexPage
