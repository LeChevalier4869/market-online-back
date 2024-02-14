const prisma = require('../config/prisma');
const createError = require('../utils/createError');

exports.getPromotionLanding = async (req, res, next) => {
    try {
        const promotions = await prisma.promotions.findMany();
        res.json({ promotions });
    } catch (err) {
        next(err);
    }
};

exports.getPromotionById = async (req, res, next) => {
    try {
        const { promotionId } = req.params;

        // validation
        if(promotionId === ':promotionId') {
            return createError(400, 'Promotion id is required');
        }

        if(isNaN(promotionId)) {
            return createError(400, 'Promotion id must be number');
        }

        const promotions = await prisma.promotions.findFirst({
            where: {
                id: Number(promotionId),
            },
        });

        if(promotions === null) {
            return createError(404, 'Promotion not found');
        }

        res.json({ promotions });
    } catch (err) {
        next(err);
    }
};