import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'

import '../components/special/@styles.scss'
import Search from '../components/ClientSearch'

// CSS
import '../styles/gatsby-custom.scss'
import { Footer } from '../components/Decorators'
import Sidebar from '../components/SidebarComponent'
import { DocPage } from '../components/PageLayouts'

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
        <DocPage>
          <Search books={context.bookData.allBooks} engine={context.bookData.options} placeholder="Search for books" />
          <h1>{query.data.markdownRemark.frontmatter.title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: query.data.markdownRemark.html }} />
        </DocPage>
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
// c=c!===c??c+c++:
