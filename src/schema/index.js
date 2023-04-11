import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required().messages({
    "string.pattern.base": `Password must have at least 8 characters, 1 uppercase letter, and 1 number`,
  }),
  name: Joi.string(),
});
