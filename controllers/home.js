exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'ERP to CRM Middleware',
        path: '/app-interface/home'
    });
};
