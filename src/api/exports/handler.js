/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(service, validator, playlistService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    try {
      this._validator.validateExportPlaylistPayload(request.payload);
      const {playlistId} = request.params;
      const {id} = request.auth.artifacts.decoded.payload;
      const playlist = await this._playlistService.verifyPlaylistOwner(
          playlistId,
          id,
      );

      const message = {
        id,
        playlistId,
        name: playlist[0].name,
        targetEmail: request.payload.targetEmail,
      };
      console.log(JSON.stringify(message));

      await this._service.sendMessage(
          'export:playlist',
          JSON.stringify(message),
      );
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
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
      // Server ERROR!
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

module.exports = ExportsHandler;
