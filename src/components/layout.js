/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

import { Background } from './background'
import { Footer } from './footer'

injectGlobal`
  @font-face {
    font-family: 'Accio';
    src: url('./fonts/AccioBeta-Regular.eot?#iefix') format('embedded-opentype'),  
      url('./fonts/AccioBeta-Regular.woff') format('woff'), 
      url('./fonts/AccioBeta-Regular.ttf')  format('truetype'), 
      url('./fonts/AccioBeta-Regular.svg#AccioBeta-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  body {
    ${tw(['m-0', 'font-montserrat', 'font-semibold'])};
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
          <Footer />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
