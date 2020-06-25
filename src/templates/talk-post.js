import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/PostSeo';
import { rhythm, scale } from '../utils/typography';
import ArticleFooter from '../components/ArticleFooter';

function TalkPostTemplate(props) {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const url = props.data.site.siteMetadata.siteUrl + post.fields.slug;
  const {
    previous,
    next,
    heroImageUrl,
    heroTwitterImageUrl,
  } = props.pageContext;
  const isWip = post.fields.wip;
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={heroImageUrl}
        twitterImage={heroTwitterImageUrl}
        url={post.fields.slug}
        post={post.frontmatter}
      />
      <h1>
        {isWip ? 'WIP: ' : null}
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
        }}
      >
        <p style={{ margin: 0 }}>
          <span role="img" aria-label="venue" style={{ marginRight: 4 }}>
            📍
          </span>
          {post.frontmatter.venueLink ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={post.frontmatter.venueLink}
            >
              {post.frontmatter.venue}
            </a>
          ) : (
            post.frontmatter.venue
          )}
        </p>
        <p style={{ margin: 0 }}>
          {post.frontmatter.occasion ? (
            <>
              <span role="img" aria-label="group" style={{ marginRight: 4 }}>
                👥
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.frontmatter.occasionLink}
              >
                {post.frontmatter.occasion}
              </a>
            </>
          ) : null}
        </p>
        <p style={{ margin: 0 }}>
          <span role="img" aria-label="date" style={{ marginRight: 4 }}>
            🗓
          </span>
          {post.frontmatter.date}
        </p>
        <p style={{ margin: 0 }}>
          {post.frontmatter.slides ? (
            <>
              <span role="img" aria-label="slide" style={{ marginRight: 4 }}>
                📝
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.frontmatter.slides}
              >
                Slides
              </a>
            </>
          ) : null}
        </p>
        <p style={{ margin: 0 }}>
          {post.frontmatter.video ? (
            <>
              <span role="img" aria-label="video" style={{ marginRight: 4 }}>
                📹
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.frontmatter.video}
              >
                Video
              </a>
            </>
          ) : null}
        </p>
        <blockquote style={{ marginTop: rhythm(1) }}>
          {post.frontmatter.description}
        </blockquote>
      </p>
      {post.frontmatter.slides && (
        <iframe
          src={post.frontmatter.slides + '/embed'}
          width="100%"
          height="320"
          scrolling="no"
          frameborder="0"
          title="slides"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ArticleFooter url={url} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
}

export default TalkPostTemplate;

export const pageQuery = graphql`
  query TalkPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        wip
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
// frontmatter {
//   date(formatString: "MMMM DD, YYYY")
//   title
//   occasion
//   occasionLink
//   venue
//   venueLink
//   description
//   slides
//   video
// }