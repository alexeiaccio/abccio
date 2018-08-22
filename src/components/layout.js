/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

import { Background } from './background'

injectGlobal`
  body {
    ${tw(['fixed', 'overflow-hidden', 'pin', 'm-0'])};
  }
`

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div
          className={css`
            ${tw('absolute pin')};
          `}
        >
          <Background />
          <div
            className={css`
              ${tw('flex h-full items-center justify-center relative')};
            `}
          >
            {children}
          </div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
