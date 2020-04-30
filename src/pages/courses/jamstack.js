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
        <SEO title="404: Not Found" />
        <h1>How to learn the modern JAMStack</h1>
        <p>
          Learn to build fast, performant, modern applications and websites. Click below to
          buy.
        </p>
        <Link to="/courses/buy/jamstack">
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
