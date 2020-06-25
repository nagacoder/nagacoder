/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({
  siteLanguage = 'en',
  meta = [],
  title,
  description,
  image,
  twitterImage,
  url,
  post,
}) {
  const {
    site,
    file: { publicURL: profilePicture },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        file(
          sourceInstanceName: { eq: "assets" }
          relativePath: { eq: "profile-pic.png" }
        ) {
          publicURL
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaImage = `${site.siteMetadata.siteUrl}${twitterImage || image || profilePicture}`;
  const metaKeywords = post.tags ? post.tags.split(',') : [];

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: siteLanguage,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: 'image',
            content: metaImage,
          },
          {
            property: 'og:image',
            content: metaImage,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: 'twitter:site',
            content: '@lihautan',
          },
          {
            name: `twitter:card`,
            content: twitterImage ? 'summary_large_image' : `summary`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: metaImage,
          },
        ]
          .concat(
            metaKeywords.length > 0
              ? {
                  name: `keywords`,
                  content: metaKeywords.join(`, `),
                }
              : []
          )
          .concat(meta)}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Article',
          author: {
            '@type': 'Person',
            name: site.siteMetadata.author,
          },
          copyrightHolder: {
            '@type': 'Person',
            name: site.siteMetadata.author,
          },
          copyrightYear: '2019',
          creator: {
            '@type': 'Person',
            name: site.siteMetadata.author,
          },
          publisher: {
            '@type': 'Organization',
            name: site.siteMetadata.author,
            logo: {
              '@type': 'ImageObject',
              url: profilePicture,
            },
          },
          datePublished: post.date,
          dateModified: post.lastUpdated || post.date,
          description: metaDescription,
          headline: title,
          inLanguage: siteLanguage,
          url: `${site.siteMetadata.siteUrl}${url}`,
          name: title,
          image: {
            '@type': 'ImageObject',
            url: metaImage,
          },
          mainEntityOfPage: `${site.siteMetadata.siteUrl}${url}`,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          description: 'Breadcrumbs list',
          name: 'Breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              item: {
                '@id': site.siteMetadata.siteUrl,
                name: 'Homepage',
              },
              position: 1,
            },
            {
              '@type': 'ListItem',
              item: {
                '@id': `${site.siteMetadata.siteUrl}${url}`,
                name: title,
              },
              position: 2,
            },
          ],
        })}
      </script>
      <meta itemprop="url" content={`${site.siteMetadata.siteUrl}${url}`} />
      <meta itemprop="image" content={metaImage} />
    </>
  );
}

export default SEO;
