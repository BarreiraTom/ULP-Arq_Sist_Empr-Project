const zoho = require('@trifoia/zcrmsdk');
const config = require('./zoho.config');

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
                    console.log(JSON.parse(response.body).data);
                    res.status(404).render('app-interface/crm/faturas', {
                        pageTitle: 'CRM Faturas',
                        path: 'app-interface/crm/faturas',
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
            res.redirect('/crm/faturas');
        });
    });
};
