const Joi = require("@hapi/joi");

const findScriptSchema = Joi.object({
  startDir: Joi.string().optional(),
  type: Joi.string().allow("d", "f").required(),
  identifier: Joi.string().required(),
  maxDepth: Joi.number().min(0).max(6).optional(),
});

module.exports = { findScriptSchema };
