const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('app-interface/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        validationErrors: [],
        oldInput: {
            username: '',
            password: ''
        }
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        // console.log(err);
        res.redirect('/login');
    });
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // bcrypt.hash(password, 12).then(password => {
    //     console.log(password);
    // });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('app-interface/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            oldInput: {
                username: username,
                password: password
            }
        });
    }

    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.status(422).render('app-interface/login', {
                    path: '/login',
                    pageTitle: 'Login',
                    errorMessage: 'Invalid username or password.',
                    validationErrors: []
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    return res.status(422).render('app-interface/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: 'Invalid email or password.',
                        validationErrors: []
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
