const cloudUpload = require('../utils/cloudUpload');
const prisma = require('../config/prisma');
const createError = require('../utils/createError');
const { createProductSchema, createPromotionSchema, updateProductSchema } = require('../validator/admin-validator');

exports.createProduct = async (req, res, next) => {
    try {
        const value = await createProductSchema.validateAsync(req.body);
        const { brandId, categoryId } = req.body;

        const product = await prisma.products.create({
            data: {
                ...value,
                brand: {
                    connect: {
                        id: Number(brandId),
                    },
                },
                category: {
                    connect: {
                        id: Number(categoryId),
                    },
                },
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
            },
        });

        const imagesPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path);
        });

        const imgUrlArray = await Promise.all(imagesPromiseArray);

        const productImages = imgUrlArray.map((imgUrl) => {
            return {
                url: imgUrl,
                productId: product.id,
            };
        });

        await prisma.product_Img.createMany({
            data: productImages,
        });

        const newProduct = await prisma.products.findFirst({
            where: {
                id: product.id,
            },
            include: {
                product_imgs: true,
            },
        });

        res.json({ newProduct });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const value = await updateProductSchema.validateAsync(req.body);

        if(productId === ':productId') {
            return createError(400, 'Product is required');
        }

        if(isNaN(productId)) {
            return createError(400, 'Product id must be number');
        }

        const checkId = await prisma.products.findFirst({
            where: {
                id: Number(productId),
            },
        });

        if(checkId === null) {
            return createError(400, 'Product not found');
        }

        const product = await prisma.products.update({
            where: {
                id: Number(productId),
            },
            data: {
                ...value,
            },
        });

        res.json({ product });
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.categories.create({
            data: {
                name,
            },
        });

        res.json({ category });
    } catch (err) {
        next(err);
    }
};

exports.createBrand = async (req, res, next) => {
    try {
        const { name } = req.body;
        const brand = await prisma.brands.create({
            data: {
                name,
            },
        });

        res.json({ brand });
    } catch (err) {
        next(err);
    }
};

exports.createPromotion = async (req, res, next) => {
    try {
        const value = await createPromotionSchema.validateAsync(req.body);

        const promotion = await prisma.promotions.create({
            data: {
                ...value,
            },
        });

        res.json({ promotion });
    } catch (err) {
        next(err);
    }
};

exports.productLanding = async (req, res, next) => {
    try {
        const products = await prisma.products.findMany({
            where: {
                userId: req.user.id
            },
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

exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;

        //validation

        const id = await prisma.products.findFirst({
            where: {
                id: Number(productId),
            },
        });

        if(id === null) {
            return createError(400, 'Product not found');
        }

        const deleteProduct = await prisma.products.delete({
            where: {
                id: Number(productId),
            },
        });
        res.json({ message: 'deleted', deleteProduct });
    } catch (err) {
        next(err);
    }
};
