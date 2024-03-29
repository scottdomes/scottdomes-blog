import React from "react"
import "katex/dist/katex.min.css"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import { MDXProvider } from "@mdx-js/react"
import EmailSignup from "./emailSignup"
import ReadingListSignUp from "../components/readingListSignUp"
import Quizlet from "../components/Quizlet"
import WolframPattern from "./WolframPattern/Base"
import BinaryWolframPattern from "./WolframPattern/Binary"
import CustomWolframPattern from "./WolframPattern/Custom"
import RuleDisplay from "./WolframPattern/RuleDisplay"

import Checkout from "./checkout"
import HooksVideo from "./videos/HooksVideo"
import "./styles/layout.css"

const shortcodes = {
  EmailSignup,
  Checkout,
  ReadingListSignUp,
  HooksVideo,
  Quizlet,
  WolframPattern,
  BinaryWolframPattern,
  CustomWolframPattern,
  RuleDisplay   
}

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(0.6),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <MDXProvider components={shortcodes}>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
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

export default Layout
