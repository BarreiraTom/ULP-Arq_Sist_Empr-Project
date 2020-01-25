exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'Homepage',
        path: '/app-interface/home',
        test: 'hello'
    });
};
var request = require('request');

exports.getFaturas = (req, res, next) => {
    res.render('app-interface/faturas', {
        pageTitle: 'Faturas',
        path: '/app-interface/faturas',
        billing: request({
                    url: 'https://my.jasminsoftware.com/api/230056/230056-0001/billing/invoices/',
                    method: 'GET',
                    headers: {
                        //"accept": "application/json", 
                        //"accept-encoding": "gzip, deflate", 
                        "content-type": "application/json",
                        "Authorization": request(
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
                                                //console.log('Access Token:', json.access_token);
                                                return json.access_token;
                                            } else {
                                                //console.log('Could not obtain acess token.');
                                            }
                                        }
                        )
                    }
                    
                
                })
    });
};

exports.getEncomendas = (req, res, next) => {
    res.render('app-interface/Encomendas', {
        pageTitle: 'Encomendas',
        path: '/app-interface/faturas'
    });
};
