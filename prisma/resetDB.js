const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    await prisma.$executeRawUnsafe('DROP DATABASE market-online');
    await prisma.$executeRawUnsafe('CREATE DATABASE market-online');
};

console.log('Reset DATABASE');
run();
