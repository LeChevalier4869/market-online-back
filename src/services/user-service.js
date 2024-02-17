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

exports.getUserByUsername = (username) => {
    return prisma.users.findFirst({
        where: {
            username,
        },
    });
}; 

exports.createUser = (role, firstName, lastName, phone, email, username, password) => {
    return prisma.users.create({
        data: {
            role, 
            firstName,
            lastName,
            phone,
            username,
            email,
            password,
        },
    });
};