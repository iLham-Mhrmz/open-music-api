/* eslint-disable require-jsdoc */
class SongsHandler {
  constructor(service) {
    this._service = service;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.DeleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  postSongHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  getSongsHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  getSongByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  putSongByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  deleteSongByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }
}

module.exports = SongsHandler;

