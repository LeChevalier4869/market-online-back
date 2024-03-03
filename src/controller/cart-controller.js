const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getCartByUser = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: {
                userId: req.user.id,
            },
        });

        if(cart === null) {
            return createError(400, 'Data is null')
        }

        res.json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { 
            totalBeforeDiscount, 
            discount, 
            deliveryFee, 
            total 
         } = req.body;

        if(isNaN(totalBeforeDiscount)) {
            return createError(400, 'Total before discount must be number');
        }
        if(isNaN(discount)) {
            return createError(400, 'Discount must be number');
        }
        if(isNaN(deliveryFee)) {
            return createError(400, 'Delivery fee must be number');
        }
        if(isNaN(total)) {
            return createError(400, 'Total must be number');
        }

        const cart = await prisma.cart.update({
            where: {
                userId: req.user.id,
            },
            data: {
                totalBeforeDiscount,
                discount,
                deliveryFee,
                total,
            },
        });

         res.json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.addProductToCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        if(cartId === ':cartId') {
            return createError(400, 'Cart id is required');
        }

        if(isNaN(cartId)) {
            return createError(400, 'Cart id must be number');
        }

        if(productId === ':product Id') {
            return createError(400, 'Product id is required');
        }

        if(isNaN(productId)) {
            return createError(400, 'Product id must be number');
        }

        if(isNaN(quantity)) {
            return createError(400, 'Quantity must be number');
        }

        const cart = await prisma.cart_Product.create({
            data: {
                quantity: Number(quantity),
                cartId: Number(cartId),
                productId: Number(productId),
            },
        });
        
        res.json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.getProductInCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;

        if(cartId === ':cartId') {
            return createError(400, 'Cart id is required');
        }

        if(isNaN(cartId)) {
            return createError(400, 'Cart id must be number');
        }

        const cart = await prisma.cart_Product.findMany({
            where: {
                id: Number(cartId),
            },
            include: {
                product: true,
            },
        });

        if(cart.length === 0) {
            return createError(400, 'Data is null')
        }

        //console.log(cart);

        res.json({ cart });
    } catch (err) {
        next(err);
    }
};

// For old user

exports.createCart = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if(userId === ':userId') {
            return createError(400, 'User id is required');
        }

        if(isNaN(userId)) {
            return createError(400, 'User id must be number');
        }

        const cart = await prisma.cart.create({
            data: {
                totalBeforeDiscount: Number(0),
                discount: Number(0),
                deliveryFee: Number(0),
                total: Number(0),
                userId: Number(userId),
            },
        });

        res.json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.deleteProductInCart = async (req, res, next) => {
    try {
        const { cpId } = req.params;

        if(cpId === ':cpId') {
            return createError(400, 'Cart product id is required');
        }

        const cpIdRS = await prisma.cart_Product.findFirst({
            where: {
                id: Number(cpId),
            },
        });

        if(cpIdRS === null) {
            return createError(400, 'Cart product id is required');
        }

        if(isNaN(cpId)) {
            return createError(400, 'Cart product id must be number');
        }
        
        const cart = await prisma.cart_Product.delete({
            where: {
                id: Number(cpId),
            },
        });
        
        res.json({ message: 'Deleted', cart });
    } catch (err) {
        next(err);
    }
};