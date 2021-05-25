import Joi from "joi";

const validate = (schema) => (req, res, next) => {
  try {
    const validate = schema.validate(req.body);
    if (validate.error) throw validate.error;
    req.body = validate.value;
    return next();
  } catch (error) {
      res.status(400).json({ error: `Validation error: ${error.details.map((x) => x.message).join(", ")}` });
  }
};

const createGameSchema = Joi.object({
  rows: Joi.number().min(3).required(),
  columns: Joi.number().min(3).required(),
  minesQty: Joi.number().min(1).required(),
}).required();

const flagCellSchema = Joi.object({
  row: Joi.number().min(0).required(),
  column: Joi.number().min(0).required(),
}).required();

const revealCellSchema = Joi.object({
  row: Joi.number().min(0).required(),
  column: Joi.number().min(0).required(),
}).required();

export const validation = {
  validateCreateGame: validate(createGameSchema),
  validateFlagCell: validate(flagCellSchema),
  validateRevealCell: validate(revealCellSchema),
};
