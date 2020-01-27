const axios = require('axios');

exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'Homepage',
        path: '/app-interface/home',
        test: 'Hello world!'
    });
};

exports.getAxios = (req, res, next) => {
    axios
        .request({
            url: 'https://identity.primaverabss.com/core/connect/token',
            method: 'POST',
            auth: {
                username: 'ERP-TO-CRM',
                password: '1518606f-a8d4-40bd-ae5b-b192da6a859c'
            },
            data: {
                grant_type: 'client_credentials',
                scope: 'application'
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
};
