'use strict'

const proxy = require('http-proxy-middleware')
const path = require(`path`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'suvam0451-website-demo',
    description: 'A demo website for project.',
    keywords: 'gatsbyjs, gatsby, javascript, sample, something',
    siteUrl: 'https://suvam0451-website-demo.netlify.com',
    author: {
      name: 'Debashish Patra',
      url: 'https://gitlab.com/suvam0451',
      email: 'suvam0451@outlook.com'
    }
  },
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  // ignore: [process.env.IGNORE_POST_FOLDER],
  // developMiddleware: app => {
  //   app.use(
  //     '/.netlify/functions/',
  //     proxy({
  //       target: 'http://localhost:9000',
  //       pathRewrite: {
  //         '/.netlify/functions/': ''
  //       }
  //     })
  //   )
  // },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: true,
              noInlineHighlight: false,
              aliases: {},
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false
              },
              escapeEntites: {}
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtension: [`png`, `jpg`, `jpeg`]
            }
          },
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require('tailwindcss')
          //  require('./tailwind.config.js')
        ]
      }
    }
  ]
}
