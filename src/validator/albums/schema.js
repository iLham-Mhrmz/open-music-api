const Joi = require('joi');
const currentYear = new Date().getFullYear();

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required().min(1900).max(currentYear),
});

module.exports = {AlbumPayloadSchema};
