/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('./src/utils/tailwind-base.css')
require('./src/utils/tailwind-components.css')
require('./src/utils/tailwind-utilities.css')

exports.onInitialClientRender = () => {
  // require("typeface-nanito")
}

require('@blueprintjs/core/lib/css/blueprint.css')
require('@blueprintjs/icons/lib/css/blueprint-icons.css')

// carousal library
// require('slick-carousel/slick/slick-theme.css')
// require('slick-carousel/slick/slick.css')

require(`prismjs/prism.js`)

require('prism-themes/themes/prism-darcula.css')
// require('./src/styles/prism-darcula.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

// require(`prismjs/components/prism-clike.js`)
require(`prismjs/components/prism-c.js`)
require(`prismjs/components/prism-cpp.js`)
require(`prismjs/components/prism-git.js`)
require(`prismjs/components/prism-batch.js`)

require('./src/styles/gatsby-custom.scss')
