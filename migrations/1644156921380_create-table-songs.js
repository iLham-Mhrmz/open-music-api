/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notnull: true,
    },
    year: {
      type: 'INTEGER',
      notnull: true,
    },
    coverurl: {
      type: 'VARCHAR(255)',
      notnull: false,
    },
  });

  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notnull: true,
    },
    year: {
      type: 'INTEGER',
      notnull: true,
    },
    performer: {
      type: 'TEXT',
      notnull: true,
    },
    genre: {
      type: 'TEXT',
      notnull: true,
    },
    duration: {
      type: 'INTEGER',
      notnull: false,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notnull: true,
    },
  });
  pgm.addConstraint(
      'songs',
      'fk_songs.album_id_albums.id',
      'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
  pgm.dropTable('albums');
};
