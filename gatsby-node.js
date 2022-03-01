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
              'x-graphql-query-uuid': 'livestory---PostsWithGraph{"livestory_id":"h_03f0d7de5c9d6c55d8f338a3c3ba232a","startId":null}---e2451a5f7c563cbe6f9688458c5048f51fdfacf26dc216e18a72f11afc1b401d'
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