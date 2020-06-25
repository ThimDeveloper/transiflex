const Joi = require("@hapi/joi");

const commandSchema = Joi.object({
  func: Joi.function().required(),
  name: Joi.string().required(),
  args: Joi.array().optional(),
  options: Joi.array().optional(),
  aliases: Joi.array().min(0).max(5).optional(),
  description: Joi.string().required(),
});

module.exports = {
  commandSchema,
};
