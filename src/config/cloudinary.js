const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnputuost', 
    api_key: '148933181678562', 
    api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;