import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'

import '../components/special/@styles.css'
import Search from '../components/ClientSearch'

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
        idx_sidebar: number
      }
    }
  }
  pageContext: any
}

function PageTemplate(query: PageTemplateProps) {
  let fm = query.data.markdownRemark.frontmatter
  let site = query.data.site
  let context = query.pageContext
  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar />
        <Sidebar SectionIdx={fm.idx_sidebar} />
        <div className="area_scrollable">
          <div className="container_mainpage">
            <div className="layout_mainpage" />
            <div className="layout_mainpage">
              <Search books={context.bookData.allBooks} engine={context.bookData.options} placeholder="Search for books" />
              <h1>{query.data.markdownRemark.frontmatter.title}</h1>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: query.data.markdownRemark.html }} />
            </div>
            {/* Last element (required in sass) */}
            <div className="layout_mainpage">
              <iframe
                className="researchgate_embed"
                src="https://www.researchgate.net/plugins/department?stats=true&faces=true&publications=true&height=600&width=300&theme=light&type=department&installationId=5ef18e2b12eb0b14a569b35c"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

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
        idx_sidebar
      }
    }
  }
`
