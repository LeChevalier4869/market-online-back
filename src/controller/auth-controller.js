const createError = require('../utils/createError');
const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {

    /* 
    ------ Logic ------ 
    - check email and password has received
    - check type of email and password are string?
    - check email unique
    - hashed password
    - get hashed password in datebase
    */

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return createError(400, 'Email and password required');
        }

        if(typeof email !== 'string' || typeof password !== 'string') {
            return createError(400, 'Email or password is invalid');
        }

        const isUserExist = await userService.getUserByEmail(email);

        if(isUserExist) {
            return createError(400, 'User already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userService.createUser(email, hashedPassword);

        res.json({ email, password });

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    
    /*  
    ------ Logic ------
    - receive email and password
    - check email and password have already in database
    - check password is match
    - send token
    */

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return createError(400, 'Email or password is invalid');
        }

        if(typeof email !== 'string' || typeof password !== 'string') {
            return createError(400, 'Email or password is invalid');
        }

        const isUserExist = await userService.getUserByEmail(email);

        if(!isUserExist) {
            return createError(400, 'Email or password is invalid');
        }

        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordMatch) {
            return createError(400, 'Email or password is invalid');
        }

        const token = jwt.sign(
            { id: isUserExist.id }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN, },
            );

        res.json({ token });

    } catch (err) {
        next(err);
    }

};

exports.forgetPassword = async (req, res, next) => {

    /*
    ------ Logic ------
    - generate token 
    - create link 
    - send email
    */

    try {
        const { email } = req.body;

        if(!email) {
            return createError(400, 'Email is required');
        }

        if(typeof email !== 'string') {
            return createError(400, 'Type of email must be string');
        }

        const isUserExist = await userService.getUserByEmail(email);

        if(!isUserExist) {
            return createError(400, 'Email not exist');
        }

        //not complete

        res.json({ email });

    } catch (err) {
        next(err);
    }

};

exports.verifyForgetPassword = (req, res, next) => {

    /*
    ------ Logic ------
    - check token
    - redirect reset password with token
    */

    try {
        const { token } = req.params;
        //not complete
        res.json({ message: 'Verify forget password', token });

    } catch (err) {
        next(err);
    }

};

exports.resetPassword = (req, res, next) => {

    /*
    ------ Logic ------
    - change new password
    - get new password in database
    */

    try {
        const { token } = req.params;
        const { password } = req.body;
        //not complete
        res.json({ message: 'Reset password', password, token });
    } catch (err) {
        next(err);
    }

};