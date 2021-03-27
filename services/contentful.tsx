import * as contentful from 'contentful';
import { postImageSizes, previewImageSizes } from 'constants/Post';

const spaceId = `57e4k2ca6fmc`;
const accessToken = `Lh4LbfbNBL_vd6Vy22vMWSmiPiVdhYwenpfNzfyAyjg`;

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: spaceId,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken,
});

const POST_GRAPHQL_LIST_FIELDS = `
annotation{
  json
}
content {
  json
}
date
image: preview {
  preview: url(transform: {width: ${previewImageSizes.width}, height: ${previewImageSizes.height}, resizeStrategy: FIT, format: JPG, quality: 90})
}
slug
title
`;
const POST_GRAPHQL_FIELDS = `
annotation{
  json
}
content {
  json
  links {
    assets {
      block {
        title
        url
        sys {
          id
        }
      }
    }
  }
}
date
image: preview {
  preview: url(transform: {width: ${previewImageSizes.width}, height: ${previewImageSizes.height}, resizeStrategy: FIT, format: JPG, quality: 90})
  post: url(transform: {width: ${postImageSizes.width}, height: ${postImageSizes.width}, resizeStrategy: FIT, format: JPG, quality: 90})
}
slug
title
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postsCollection?.items;
}
function extractPost(fetchResponse) {
  return fetchResponse?.data?.postsCollection?.items?.[0];
}

async function fetchGraphQL(query) {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postsCollection {
        items {
          ${POST_GRAPHQL_LIST_FIELDS}
        }
      }
    }`
  );

  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug) {
  const entry = await fetchGraphQL(
    `query {
      postsCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return {
    post: extractPost(entry),
  };
}

export async function getAllPostsForBlog() {
  const entries = await fetchGraphQL(
    `query {
      postsCollection(order: date_DESC, preview: false) {
        items {
          ${POST_GRAPHQL_LIST_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export { fetchGraphQL };
export default client;
