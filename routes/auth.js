const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
    '/login',
    [
        body('username')
            .not()
            .isEmpty()
            .trim()
            .escape()
            .withMessage('Please enter a valid username address.'),
        body('password', 'Password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

router.get('/logout', authController.postLogout);

module.exports = router;
