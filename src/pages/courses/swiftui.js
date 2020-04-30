import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import styles from './styles/courses.module.css';

class ThanksPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Buy course" />
        <h1>How to learn Swift UI + Firebase</h1>
        <p>
          Finally build that app you've been thinking about it. Click below to
          buy.
        </p>
        <Link to="/courses/buy/swiftui">
          <button className={styles.button}>
            Buy
          </button>
        </Link>
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
