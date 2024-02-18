const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getProductsLanding = async (req, res, next) => {
    try {
        const products = await prisma.products.findMany({
            include: {
                brand: true,
                category: true,
                product_imgs: true,
            },
         });
        res.json({ products });
    } catch (err) {
        next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const { search, brand, category } = req.query;
        const product = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: search,
                    },
                    {
                        brand: {
                            name: brand,
                        },
                    },
                    {
                        category: {
                            name: category,
                        },
                    },
                ],
            },
            include: {
                brand: true,
                category: true,
                product_imgs: true,
            },
        });
        if(product.length === 0) {
            return createError(404, 'Product not found');
        }
        res.json({ product });
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if(productId === ':productId') {
            return createError(400, 'Product id is required');
        }

        if(isNaN(productId)) {
            return createError(400, 'Product id must be number');
        }

        const product = await prisma.products.findFirst({
            where: {
                id: Number(productId),
            },
            include: {
                category: true,
                brand: true,
                product_imgs: true,
                product_promotions: true,
            },
        });

        if(product === null) {
            return createError(404, 'Product not found');
        }

        res.json({ product });
    } catch (err) {
        next(err);
    }
};