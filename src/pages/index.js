import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import styles from './index.module.css';

function Index({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const {
    portfolios: { edges: portfolios },
    blogs: { edges: blogs },
    notes: { edges: notes },
    // talks: { edges: talks },
  } = data;
 

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Bio />

      <h3>
        {/* Interesting Facts */}
        <span role="img" className="emoji">
          {'👋'}
        </span>
      </h3>
      <ul style={{ marginBottom: rhythm(0.25) }}>
        <li className={styles.list}>
          {`I'm from Palembang, Indonesia `}
          <span role="img" className="emoji">
            {'🇮🇩'}
          </span>
          
          .
        </li>
        <li className={styles.list}>
          {'I love '}
          <span role="img" className="emoji">
            {'⚛'}
          </span>{' '}
          React, and I build <Link to="/github.com/nagacoder">projects</Link>
          {' with '}
          <span role="img" className="emoji">
            {'⚛'}
          </span>
          {' React.'}
        </li>
        <li className={styles.list}>
        I love connecting with people and helping people connect with each other. For me, nothing is better than when people can come together, share, and help each other be more awesome
        </li> 
        {/* <li className={styles.list}>
          I contribute to open source projects, such as{' '}
          <a
            href="https://github.com/sveltejs/svelte"
            target="_blank"
            rel="noopener noreferrer"
          >
            Svelte
          </a>{' and '}
          <a
            href="https://github.com/babel/babel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Babel
          </a> 
           </li> */}
        <li className={styles.list}>
          {'You can find me on '}
          <a
            href="https://twitter.com/nagacoder"
            aria-label="Twitter handle: nagacoder"
            target="_blank"
            rel="noreferrer noopener"
          >
            Twitter
          </a>
          {', '}
          <a
            href={`https://github.com/nagacoder`}
            aria-label="nagacoder Github Repository"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
          {' and '}
          <a
            href={`https://www.linkedin.com/in/nagacoder/`}
            aria-label="Linkedin"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          .
        </li>
      </ul>

      <h3>
        Recent Articles{' '}
        <span role="img" className="emoji">
          {'📖'}
        </span>
      </h3>
      <p className={styles.p}>Thoughts and lessons I've learned:</p>
      <ul style={{ marginBottom: rhythm(0.25) }}>
        {blogs.map(({ node: { frontmatter: { title }, fields: { slug } } }) => {
          return (
            <li className={styles.list} key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
        <li className={styles.list}>
          <Link style={{ textDecoration: 'none' }} to="/blogs/">
            ... Read more
          </Link>
        </li>
      </ul>
      <h3>
      Diary{' '}
        <span role="img" className="emoji">
          {'✍🏻'}
        </span>
      </h3>
      <ul style={{ marginBottom: rhythm(0.25) }}>
        {notes.map(({ node: { frontmatter: { title }, fields: { slug } } }) => {
          return (
            <li className={styles.list} key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
        <li className={styles.list}>
          <Link style={{ textDecoration: 'none' }} to="/notes/">
            ... Read more
          </Link>
        </li>
      </ul>

      {/* <h3>
        Open Source{' '}
        <span role="img" className="emoji">
          {'❤️'}
        </span>
      </h3>
      <p className={styles.p}>
        Since{' '}
        <Link to="/parsing-error-flow-type-parameter-instantiation">
          I stumbled upon a bug in babel
        </Link>
        , I've been actively contributing to{' '}
        <a
          href="https://github.com/babel/babel"
          target="_blank"
          rel="noopener noreferrer"
        >
          babel
        </a>
        . I am now currently a member of the babel organisation.
      </p>
      <h3>
        Projects{' '}
        <span role="img" className="emoji">
          {'💻'}
        </span>
      </h3>
      <p className={styles.p}>Cool stuff that I've been working on:</p>
      <ul style={{ marginBottom: rhythm(0.25) }}>
        {portfolios.map(
          ({
            node: {
              frontmatter: { title, description },
              fields: { website },
            },
          }) => {
            return (
              <li key={title} className={styles.list}>
                <a href={website}>{title}</a> <small>{description}</small>
              </li>
            );
          }
        )}
      </ul> */}
      
    </Layout>
  );
}

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    portfolios: allMarkdownRemark(
      filter: { fields: { type: { eq: "portfolios" }, wip: { ne: true } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
          }
          fields {
            website
          }
        }
      }
    }
    blogs: allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" }, wip: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    talks: allMarkdownRemark(
      filter: { fields: { type: { eq: "talk" }, wip: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            
          }
        }
      }
    }
    notes: allMarkdownRemark(
      filter: { fields: { type: { eq: "notes" }, wip: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            
          }
        }
      }
    }
  }
`;
