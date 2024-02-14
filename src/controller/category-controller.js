const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getCategoryLanding = async (req, res, next) => {
    try {
        const categories = await prisma.categories.findMany();
        res.json({ categories });
    } catch (err) {
        next(err);
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        // validation
        if(categoryId === ':categoryId') {
            return createError(400, 'Category id is required');
        }

        if(isNaN(categoryId)) {
            return createError(400, 'Category id must be number');
        }

        const categories = await prisma.categories.findFirst({
            where: {
                id: Number(categoryId),
            },
        });
        
        if(categories === null) {
            return createError(404, 'Category not found');
        }

        res.json({ categories });
    } catch (err) {
        next(err);
    }
};