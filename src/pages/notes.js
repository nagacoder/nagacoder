import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

function NoteIndex({ data, location }) {
  const notes = data.allMarkdownRemark.edges;
  console.log(data);
  return (
    <Layout
      location={location}
      title={data.site.siteMetadata.title}
      hideScrollIndicator
    >
      <SEO
        title="Notes"
        keywords={[`blog`, `gatsby`, `javascript`, `react`, 'notes']}
      />
      <h1> Notes</h1>
      {notes.map(
        ({
          node: {
            fields: { slug, noteDate, noteTitle },
          },
        }) => {
          return (
            <div
              style={{
                marginTop: rhythm(0.45),
              }}
            >
              <div key={slug}>
                <Link style={{ boxShadow: `none` }} to={slug}>
                  {`${noteTitle}`}
                </Link>
              </div>
              <div style={{
                marginTop: rhythm(-0.15),
                fontSize:rhythm(0.45)
              }}>{`${noteDate}`}</div>
            </div>
          );
        }
      )}
    </Layout>
  );
}

export default NoteIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "notes" }, wip: { ne: true } } }
      sort: { fields: [fields___noteDate], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            type
            noteDate
            noteTitle
          }
        }
      }
    }
  }
`;
