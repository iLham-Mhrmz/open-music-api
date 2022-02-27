/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesCountHandler = this.getAlbumLikesCountHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    try {
      const {albumId} = request.params;
      const userId = request.auth.credentials.id;

      await this._albumsService.getAlbumById(albumId);

      const likeStatus = await this._service.checkLikeStatus(userId, albumId);

      if (likeStatus === false) {
        await this._service.addAlbumLike(userId, albumId);

        const response = h.response({
          status: 'success',
          message: 'You\'ve liked this album',
        });
        response.code(201);
        return response;
      }

      await this._service.deleteAlbumLike(userId, albumId);

      const response = h.response({
        status: 'success',
        message: 'You\'ve unlike this album',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }


      const response = h.response({
        status: 'error',
        message: 'Sorry, there\'s internal server error',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAlbumLikesCountHandler(request, h) {
    try {
      const {albumId} = request.params;

      const likes = await this._service.getAlbumLikesCount(albumId);
      const likesCount = likes.count;
      const response = h.response({
        status: 'success',
        data: {
          likes: likesCount,
        },
      });
      response.header('X-Data-Source', likes.source);
      response.code(200);

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Sorry, there\'s internal server error',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AlbumLikesHandler;
