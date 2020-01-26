const zoho = require('@trifoia/zcrmsdk');
const config = require('./zoho.config');

exports.getCRMFaturas = (req, res, next) => {
    zoho.initialize(config)
        .then(client => {
            client.API.MODULES.get({
                module: 'Faturas',
                params: {
                    page: 0,
                    per_page: 25
                }
            })
                .then(response => {
                    console.log(JSON.parse(response.body));
                    res.status(404).render('app-interface/404', {
                        pageTitle: 'Page Not Found',
                        path: '/404',
                        data: response.body
                    });
                })
                .catch(next);
        })
        .catch(next);
};
