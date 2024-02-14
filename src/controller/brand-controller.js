const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getBrandLanding = async (req, res, next) => {
    try {
        const brands = await prisma.brands.findMany();
        res.json({ brands });
    } catch (err) {
        next(err);
    }
};

exports.getBrandById = async (req, res, next) => {
    try {
        const { brandId } = req.params;

        // validation
        if(brandId === ':brandId') {
            return createError(400, 'Brand id is required');
        }

        if(isNaN(brandId)) {
            return createError(400, 'Brand id must be number');
        }

        const brands = await prisma.brands.findFirst({
            where: {
                id: Number(brandId),
            },
        });

        if(brands === null) {
            return createError(404, 'Brand not found');
        }

        res.json({ brands });
    } catch (err) {
        next(err);
    }
};