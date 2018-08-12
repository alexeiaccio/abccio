import React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'

import { makeSuggestion } from '../state/actions'
import Layout from '../components/layout'

const IndexPage = connect(
  ({ suggestions }) => ({ suggestions }),
  { makeSuggestion }
)(({ makeSuggestion, suggestions }) => {  
  return (
    <Layout>
      <h1>Hi people</h1>
      <input 
        type="text" 
        placeholder="Print here..."
        onChange={(e) => makeSuggestion(e.target.value)}
      />
      <button 
      >Now go build something great.</button>
      <div>
      {suggestions && suggestions.map(({ word, score }, i) =>
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
