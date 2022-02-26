const ClientError = require('../../exceptions/ClientError');

/* eslint-disable require-jsdoc */
class UploadsHandler {
  constructor(service, validator, albumsService) {
    this._service = service;
    this._validator = validator;
    this._albumsService = albumsService;

    this.postUploadCoverHandler = this.postUploadCoverHandler.bind(this);
  }

  async postUploadCoverHandler(request, h) {
    try {
      const {cover} = request.payload;
      const {id} = request.params;
      this._validator.validateImageHeaders(cover.hapi.headers);

      const filename = await this._service.writeFile(cover, cover.hapi);
      const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/covers/${filename}`;
      await this._albumsService.addAlbumCover(id, fileLocation);
      const response = h.response({
        status: 'success',
        message: 'Cover upload successfull',
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
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
module.exports = UploadsHandler;

