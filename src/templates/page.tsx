import * as React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'
import Page from '../components/Page'

import '../components/sections/markdown-post.scss'
import Container from '../components/Container'

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
    <div className="rootcontainer">
      <Helmet></Helmet>
      <NavBar></NavBar>
      <div className="sidebar">
        <Link to="/publications">Published papers</Link>
        <Link to="/">Second Link</Link>
        <Link to="/">Journal publications</Link>
        <Link to="/">Older I get</Link>
        <div className="sidebar_footer">
          <p>In association with</p>
          <p>Dept. of Civl Engineering</p>
          <p>IIT Kharagpur</p>
        </div>
      </div>
      <Page>
        <Container>
          {/* All the children are flexboxed */}
          <div className="page_mainlayout">
            {/* floating Sidebar div (Hidden in mobile) */}
            <div></div>
            <div>
              <h1>{data.markdownRemark.frontmatter.title}</h1>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            </div>
            {/* Last element (required in sass) */}
            <div className="researchgate_embed_container">
              <iframe
                className="researchgate_embed"
                src="https://www.researchgate.net/plugins/department?stats=true&faces=true&publications=true&height=600&width=300&theme=light&type=department&installationId=5ef18e2b12eb0b14a569b35c"
              />
            </div>
          </div>
        </Container>
      </Page>
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
