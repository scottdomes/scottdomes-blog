import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import { MDXProvider } from "@mdx-js/react"
import EmailSignup from "./emailSignup"
import ReadingListSignUp from "../components/readingListSignUp"
import Checkout from "./checkout"
import HooksVideo from "./videos/HooksVideo"

import "./styles/layout.css"

const shortcodes = { EmailSignup, Checkout, ReadingListSignUp, HooksVideo }

class SalesLayout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <MDXProvider components={shortcodes}>
        <HooksVideo />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(0)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
              3 / 4
            )} `,
          }}
        >
          <main>{children}</main>
          <footer style={{ fontSize: 12 }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </MDXProvider>
    )
  }
}

export default SalesLayout
