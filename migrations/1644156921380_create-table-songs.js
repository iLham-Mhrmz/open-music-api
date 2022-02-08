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
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
  pgm.dropTable('albums');
};
