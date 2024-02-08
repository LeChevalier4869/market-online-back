const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const password = bcrypt.hashSync(process.env.SEED_PASSWORD);
const userData = [
    { username: 'LeChevalier01', password, email: 'Lechevalier01@gmail.com' },
    { username: 'LeChevalier02', password, email: 'Lechevalier02@gmail.com' },
    { role: 'ADMIN', username: 'LeChevalier03', password, email: 'Lechevalier03@gmail.com' }
];

const categoryData = [
    { name: 'Drinks' },
    { name: 'Foods' },
    { name: 'Toys' }
];

const brandData = [
    { name: 'Coke' },
    { name: 'Pepsi' }
];

const productData = [
    { name: 'Coke', price: '17', detail: 'soda', userId: 3, categoryId: 1, brandId: 1 },
    { name: 'Pepsi', price: '17', detail: 'soda', userId: 3, categoryId: 1, brandId: 2 }
];

const run = async () => {
    await prisma.users.createMany({
        data: userData,
    });
    await prisma.categories.createMany({
        data: categoryData,
    });
    await prisma.brands.createMany({
        data: brandData,
    });
    await prisma.products.createMany({
        data: productData,
    });
};

run();