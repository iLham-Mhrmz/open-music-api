const Joi = require('joi');
const currentYear = new Date().getFullYear();

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().required().min(1900).max(currentYear),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string().length(22),

});

module.exports = {SongPayloadSchema};
