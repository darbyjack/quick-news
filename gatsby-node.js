require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
  });
  const fetch = require('node-fetch');
  exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest
  }) => {
    const response = await fetch(
      `https://data.api.cnn.io/graphql`, {
          method: 'POST',
          headers: {
              'x-api-key': 'P7LEOCujzt2RqSaWBeImz1spIoLq7dep7x983yQc',
              'x-graphql-query-uuid': 'livestory---PostsWithGraph{"livestory_id":"h_846e5337e700c65ff85c849b0a86197e","startId":null}---580d0f56e1d52f797065034bd92f7f0858e93d0cb9398293bbf6c2716ad096a0'
          },
      },
    );
    const data = await response.json();
    data.data.getLivestoryWebData.unpinnedPosts.forEach((item) => {
      createNode({
        ...item,
        id: item.sourceId,
        internal: {
          type: 'CnnArticle',
          contentDigest: createContentDigest(item)
        }
      });
    });
  };