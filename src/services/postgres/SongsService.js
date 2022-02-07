/* eslint-disable require-jsdoc */
const {Pool} = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  addSong({title, year, performer}) {}
}

module.exports = SongsService;
