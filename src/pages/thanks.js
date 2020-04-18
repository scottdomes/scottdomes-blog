import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class ThanksPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Thank you!</h1>
        <p>
          Thanks for joining the React Developer Challenge. I'll be in touch
          when the challenge starts.
        </p>
        <div style={{ marginBottom: 30 }}>
          <Link to="/">Back to the blog</Link>
        </div>
      </Layout>
    )
  }
}

export default ThanksPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
