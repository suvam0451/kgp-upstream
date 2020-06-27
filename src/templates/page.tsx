import * as React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'
import Page from '../components/Page'

import '../components/sections/markdown-post.scss'
import '../components/special/blockquote.scss'
import '../components/special/tables.scss'

import Container from '../components/Container'

// CSS
import '../styles/gatsby-custom.scss'
import { Footer } from '../components/Decorators'
import Sidebar from '../components/SidebarComponent'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => (
  <>
    <div className="container_root">
      <Helmet></Helmet>
      <NavBar />
      <Sidebar />
      <Page>
        {/* All the children are flexboxed */}
        <div className="container_mainpage">
          {/* floating Sidebar div (Hidden in mobile) */}
          <div className="layout_mainpage" />
          <div className="layout_mainpage">
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </div>
          {/* Last element (required in sass) */}
          <div className="layout_mainpage">
            <iframe
              className="researchgate_embed"
              src="https://www.researchgate.net/plugins/department?stats=true&faces=true&publications=true&height=600&width=300&theme=light&type=department&installationId=5ef18e2b12eb0b14a569b35c"
            />
          </div>
        </div>
      </Page>
      <Footer />
    </div>
  </>
)

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
