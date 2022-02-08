require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');
const AlbumValidator = require('./validator/albums');
const SongValidator = require('./validator/songs');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongValidator,
    },
  });
  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumValidator,
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
