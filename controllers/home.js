const request = require('request-promise');

exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'Homepage',
        path: '/app-interface/home',
        test: 'hello'
    });
};

exports.getFaturas = (req, res, next) => {
    request({
        url: 'https://identity.primaverabss.com/core/connect/token',
        method: 'POST',
        auth: {
            user: 'ERP-TO-CRM', // TODO : put your application client id here
            pass: '1518606f-a8d4-40bd-ae5b-b192da6a859c' // TODO : put your application client secret here
        },
        form: {
            grant_type: 'client_credentials',
            scope: 'application'
        }
    }).then(respToken => {
        request({
            url: 'https://my.jasminsoftware.com/api/230056/230056-0001/billing/invoices/',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(respToken).access_token
            }
        })
            .then(respBody => {
                res.render('app-interface/faturas', {
                    pageTitle: 'Faturas',
                    path: '/app-interface/faturas',
                    billing: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};

exports.getEncomendas = (req, res, next) => {
    request({
        url: 'https://identity.primaverabss.com/core/connect/token',
        method: 'POST',
        auth: {
            user: 'ERP-TO-CRM', // TODO : put your application client id here
            pass: '1518606f-a8d4-40bd-ae5b-b192da6a859c' // TODO : put your application client secret here
        },
        form: {
            grant_type: 'client_credentials',
            scope: 'application'
        }
    }).then(respToken => {
        request({
            url: 'https://my.jasminsoftware.com/api/230056/230056-0001/sales/orders/',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(respToken).access_token
            }
        })
            .then(respBody => {
                res.render('app-interface/Encomendas', {
                    pageTitle: 'Encomendas',
                    path: '/app-interface/encomendas',
                    orders: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};
