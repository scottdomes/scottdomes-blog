import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

class ThanksPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Thank you!" />
        <h1>Just one more thing...</h1>
        <p>
          Thank you for subscribing. You will need to check your inbox and
          confirm your subscription.
        </p>
        <div style={{ marginBottom: 30 }}>
          <Link to="/">Back to the blog</Link>
        </div>
      </Layout>
    );
  }
}

export default ThanksPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
