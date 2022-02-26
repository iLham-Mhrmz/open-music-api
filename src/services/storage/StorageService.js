/* eslint-disable require-jsdoc */
const fs = require('fs');
const {nanoid} = require('nanoid');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {recursive: true});
    }
  }

  writeFile(file, meta) {
    const extension = meta.filename.split('.');
    console.log(extension);
    const filename = `cover-${nanoid(16)}.${extension[extension.length - 1]}`;

    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
