const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getCartByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const cart = await prisma.cart.findFirst({
            where: {
                id: Number(userId),
            },
        });

        res.json({ cart });
    } catch (err) {
        next(err);
    }
};