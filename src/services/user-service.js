const prisma = require('../config/prisma');

exports.getUserById = (id) => {
    return prisma.users.findFirst({
        where: {
            id,
        },
    });
};

exports.getUserByEmail = (email) => {
    return prisma.users.findFirst({
        where: {
            email,
        },
    });
};

exports.createUser = (email, password) => {
    return prisma.users.create({
        data: {
            email,
            password,
        },
    });
};