const prisma = require('../config/prisma');
const createError = require('../utils/createError');
const { createAddressSchema, updateAddressSchema } = require('../validator/address-validator');

exports.getAllAddressByUser = async (req, res, next) => {
    try {
        const address = await prisma.shippingAddresses.findMany({
            where: {
                userId: req.user.id,
            },
        });

        if(address === null) {
            createError(404, 'Address not found');
        }

        res.json({ address });
    } catch (err) {
        next(err);
    }
};

exports.getAddressById = async (req, res, next) => {
    try {
        const { addressId } = req.params;

        if(addressId === ':addressId') {
            createError(400, 'Address id is required');
        }

        if(isNaN(addressId)) {
            createError(400, 'Address id must be number');
        }

        const address = await prisma.shippingAddresses.findFirst({
            where: {
                id: Number(addressId),
            },
        });

        if(address === null) {
            createError(404, 'Address not found');
        }

        res.json({ address });
    } catch (err) {
        next(err);
    }
};

exports.createAddress = async (req, res, next) => {
    try {
        const value = await createAddressSchema.validateAsync(req.body);

        const shippingAddress = await prisma.shippingAddresses.create({
            data: {
                ...value,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
            },
        });

        res.json({ shippingAddress });
    } catch (err) {
        next(err);
    }
};

exports.updateAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        const value = await updateAddressSchema.validateAsync(req.body);

        if(addressId === ':addressId') {
            return createError(400, 'Address is required');
        }

        if(isNaN(addressId)) {
            return createError(400, 'Address id must be number');
        }

        const checkId = await prisma.shippingAddresses.findFirst({
            where: {
                id: Number(addressId),
            },
        });

        if(checkId === null) {
            return createError(400, 'Address not found');
        }

        const updateAddress = await prisma.shippingAddresses.update({
            where: {
                id: Number(addressId),
            },
            data: {
                ...value,
            },
        });

        res.json({ updateAddress });
    } catch (err) {
        next(err);
    }
};

exports.deleteAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;

        //validation

        const id = await prisma.shippingAddresses.findFirst({
            where: {
                id: Number(addressId),
            },
        });

        if(id === null) {
            return createError(400, 'Address not found');
        }

        const address = await prisma.shippingAddresses.delete({
            where: {
                id: Number(addressId),
            },
        });

        res.json({ address });
    } catch (err) {
        next(err);
    }
};