import Joi from "joi";

const bookSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "Name required",
		"string.empty": "Name is not empty",
	}),
	price: Joi.number().required().min(50).max(500).messages({
		"any.required": "Price required",
		"number.empty": "Price is not empty",
		"number.min": "Price at least {#limit}",
		"number.max": "Price at most {#limit}",
	}),
	description: Joi.string().required().messages({
		"any.required": "Description required",
		"string.empty": "Description is not empty",
	}),
	image: Joi.string().required().messages({
		"any.required": "Image required",
		"string.empty": "Image is not empty",
	}),
	author: Joi.string().required().messages({
		"any.required": "author required",
		"string.empty": "author is not empty",
	}),
});

export { bookSchema };
