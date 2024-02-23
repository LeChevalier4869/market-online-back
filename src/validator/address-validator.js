const Joi = require('joi');

exports.createAddressSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    address: Joi.string().required(),
    postalCode: Joi.string().required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    subDistrict: Joi.string(),
    isMainAddress: Joi.boolean().required(),
});

exports.updateAddressSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    address: Joi.string(),
    postalCode: Joi.string(),
    province: Joi.string(),
    district: Joi.string(),
    subDistrict: Joi.string(),
    isMainAddress: Joi.boolean(),
});