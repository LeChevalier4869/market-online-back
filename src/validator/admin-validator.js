const Joi = require('joi');

exports.createProductSchema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number(),
    unit: Joi.number(),
    price: Joi.number().required(),
    detail: Joi.string().required(),
    brandId: Joi.number().required().strip(),
    categoryId: Joi.number().required().strip(),
});

exports.updateProductSchema = Joi.object({
    name: Joi.string(),
    stock: Joi.number(),
    unit: Joi.number(),
    price: Joi.number(),
    detail: Joi.string(),
    categoryId: Joi.number(),
    brandId: Joi.number(),
});

exports.createPromotionSchema = Joi.object({
    name: Joi.string().required(),
    bannerUrl: Joi.string(),
    discount: Joi.number().required(),
    point: Joi.number(),
});
