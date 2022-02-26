const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postUploadCoverHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/covers/{params*}',
    handler: {
      directory: {
        path: 'src/api/uploads/file/images',
      },
    },
  },
];

module.exports = routes;
