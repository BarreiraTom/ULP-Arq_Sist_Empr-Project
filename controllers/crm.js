const zoho = require('@trifoia/zcrmsdk');
const config = require('./zoho.config');

const Faturas = require('../models/faturas');
const Encomendas = require('../models/encomendas');

exports.getCRMFaturas = (req, res, next) => {
    zoho.initialize(config)
        .then(client => {
            client.API.MODULES.get({
                module: 'Faturas',
                params: {
                    page: 0,
                    per_page: 100
                }
            })
                .then(response => {
                    res.render('app-interface/crm/faturas', {
                        pageTitle: 'CRM Faturas',
                        path: '/app-interface/crm/faturas',
                        faturas: JSON.parse(response.body).data
                    });
                })
                .catch(next);
        })
        .catch(next);
};

exports.postCRMFatura = (req, res, next) => {
    zoho.initialize(config).then(client => {
        client.API.MODULES.post({
            module: 'Faturas',
            body: {
                // Pay ATTENTION! Data is an array!
                data: [
                    {
                        Name: req.body.fatura,
                        NIF: req.body.nif,
                        Entidade: req.body.entidade,
                        Total: req.body.total,
                        Data: req.body.data.substring(0, 10)
                    }
                ]
            }
        }).then(() => {
            const fatura = new Faturas({
                Name: req.body.fatura,
                NIF: req.body.nif,
                Entidade: req.body.entidade,
                Total: req.body.total,
                Data: req.body.data.substring(0, 10)
            });
            fatura.save().then(() => {
                res.redirect('/crm/faturas');
            });
        });
    });
};

exports.getCRMEncomendas = (req, res, next) => {
    zoho.initialize(config)
        .then(client => {
            client.API.MODULES.get({
                module: 'Encomendas',
                params: {
                    page: 0,
                    per_page: 100
                }
            })
                .then(response => {
                    res.render('app-interface/crm/encomendas', {
                        pageTitle: 'CRM Encomendas',
                        path: '/app-interface/crm/encomendas',
                        encomendas: JSON.parse(response.body).data
                    });
                })
                .catch(next);
        })
        .catch(next);
};

exports.postCRMEncomendas = (req, res, next) => {
    zoho.initialize(config).then(client => {
        client.API.MODULES.post({
            module: 'Encomendas',
            body: {
                // Pay ATTENTION! Data is an array!
                data: [
                    {
                        Name: req.body.order,
                        Nome: req.body.nome,
                        NIF: req.body.nif,
                        Entidade: req.body.entidade,
                        Total: req.body.total,
                        Data: req.body.data.substring(0, 10)
                    }
                ]
            }
        })
            .then(() => {
                const encomenda = new Encomendas({
                    Name: req.body.order,
                    Nome: req.body.nome,
                    NIF: req.body.nif,
                    Entidade: req.body.entidade,
                    Total: req.body.total,
                    Data: req.body.data.substring(0, 10)
                });
                encomenda.save().then(() => {
                    res.redirect('/crm/encomendas');
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
};
