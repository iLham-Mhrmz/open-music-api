/* eslint-disable require-jsdoc */
class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.DeleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  getAlbumsHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'ok',
    });
    response.code(201);
    return response;
  }

  getAlbumByIdHandler(request, h) {
    const {id} = request.params;
    const response = h.response({
      status: 'success',
      message: `ok id = ${id}`,
    });
    response.code(201);
    return response;
  }

  putAlbumByIdHandler(request, h) {
    const {id} = request.params;
    const response = h.response({
      status: 'success',
      message: `ok id = ${id}`,
    });
    response.code(201);
    return response;
  }

  deleteAlbumByIdHandler(request, h) {
    const {id} = request.params;
    const response = h.response({
      status: 'success',
      message: `ok id = ${id}`,
    });
    response.code(201);
    return response;
  }
}

module.exports = AlbumsHandler;
