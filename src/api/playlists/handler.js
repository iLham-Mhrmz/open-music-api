/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
    this.getSongsByPlaylistIdHandler = this.getSongsByPlaylistIdHandler.bind(this);
    this.deleteSongFromPlaylistHandler = this.deleteSongFromPlaylistHandler.bind(this);
  }
  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePostPlaylistPayload(request.payload);
      const {name} = request.payload;
      const {id: credentialId} = request.auth.credentials;

      const playlistId = await this._service.addPlaylist({name, owner: credentialId});

      const response = h.response({
        status: 'success',
        message: 'Playlist succesfully added',
        data: {
          playlistId,
        },
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

  async getPlaylistsHandler(request) {
    const {id: credentialId} = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    try {
      const {id} = request.params;
      const {id: credentialId} = request.auth.credentials;

      await this._service.verifyPlaylistOwner(id, credentialId);
      await this._service.deletePlaylistById(id);

      return {
        status: 'success',
        message: 'Playlist successfully deleted',
      };
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

  async postSongToPlaylistHandler(request, h) {
    try {
      this._validator.validatePostSongPayload(request.payload);
      const {id} = request.params;
      const {songId} = request.payload;
      const {id: credentialsId} = request.auth.credentials;

      await this._service.verifyPlaylistOwner(id, credentialsId);
      await this._service.verifySongId(songId);
      await this._service.addSongToPlaylist(id, songId);

      const response = h.response({
        status: 'success',
        message: 'Song successfully added to the playlist',
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
        message: 'Sorry, there\'s internal server error',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  async getSongsByPlaylistIdHandler(request, h) {
    try {
      const {id} = request.params;
      const {id: credentialsId} = request.auth.credentials;
      const username = request.auth.artifacts.decoded.payload.username;
      const playlist = await this._service.verifyPlaylistOwner(id, credentialsId);
      const songs = await this._service.getSongsByPlaylistId(id);

      return {
        status: 'success',
        data: {
          playlist: {
            id: playlist[0].id,
            name: playlist[0].name,
            username: username,
            songs,
          },
        },
      };
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
        message: 'Sorry, there\'s internal server error',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteSongFromPlaylistHandler(request, h) {
    try {
      this._validator.validateDeleteSongFromPlaylistPayload(request.payload);
      const {id} = request.params;
      const {songId} = request.payload;
      const {id: credentialsId} = request.auth.credentials;
      await this._service.verifyPlaylistOwner(id, credentialsId);
      await this._service.deleteSongFromPlaylist(id, songId);
      return {
        status: 'success',
        message: 'Song successfully deleted from the playlist',
      };
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

module.exports = PlaylistHandler;
