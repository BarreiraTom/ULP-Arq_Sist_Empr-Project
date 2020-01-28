const request = require('request-promise');

//
//FATURAS
//

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
                res.render('app-interface/erp/faturas', {
                    pageTitle: 'Faturas',
                    path: '/app-interface/erp/faturas',
                    billing: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};

exports.getFaturaByID = (req, res, next) => {
    const billingID = req.params.id;

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
            url:
                'https://my.jasminsoftware.com/api/230056/230056-0001/billing/invoices/' +
                billingID,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(respToken).access_token
            }
        })
            .then(respBody => {
                // res.json(JSON.parse(respBody));
                res.render('app-interface/erp/fatura-by-id', {
                    pageTitle: 'Fatura ' + JSON.parse(respBody).naturalKey,
                    path: '/app-interface/erp/faturas',
                    billingID: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};

//
//ENCOMENDAS
//
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
                res.render('app-interface/erp/encomendas', {
                    pageTitle: 'Encomendas',
                    path: '/app-interface/erp/encomendas',
                    orders: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};

exports.getEncomendaByID = (req, res, next) => {
    const orderID = req.params.id;

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
            url: 'https://my.jasminsoftware.com/api/230056/230056-0001/sales/orders/' + orderID,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(respToken).access_token
            }
        })
            .then(respBody => {
                res.render('app-interface/erp/encomenda-by-id', {
                    pageTitle: 'Encomenda ' + JSON.parse(respBody).naturalKey,
                    path: '/app-interface/erp/encomendas',
                    orderID: JSON.parse(respBody)
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};
