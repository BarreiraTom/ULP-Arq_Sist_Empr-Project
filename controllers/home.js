exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'Homepage',
        path: '/app-interface/home',
        test: 'hello'
    });
};
var request = require('request');

exports.getFaturas = (req, res, next) => {
    let access_token;
    let jsonResponse;
    new Promise((resolve, reject) => {
        request(
            {
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
            },
            function(err, res) {
                if (res) {
                    var json = JSON.parse(res.body);
                    // console.log('Access Token:', json.access_token);
                    // console.log('\n');

                    access_token = json.access_token;
                    resolve(json.access_token);
                } else {
                    console.log('Could not obtain acess token.');
                }
            }
        );
    }).then(() => {
        console.log(access_token);

        new Promise((resolve, reject) => {
            request(
                {
                    url: 'https://my.jasminsoftware.com/api/230056/230056-0001/billing/invoices/',
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: 'Bearer ' + access_token
                    }
                },
                function(err, res, body) {
                    console.log(body);
                    console.log(res);
                    console.log(err);

                    if (res) {
                        jsonResponse = res;
                        resolve(res);
                    } else {
                        console.log('Could not obtain data.');
                    }
                }
            );
        }).then(() => {
            res.render('app-interface/faturas', {
                pageTitle: 'Faturas',
                path: '/app-interface/faturas',
                billing: jsonResponse
            });
        });
    });
};

exports.getEncomendas = (req, res, next) => {
    res.render('app-interface/Encomendas', {
        pageTitle: 'Encomendas',
        path: '/app-interface/faturas'
    });
};
