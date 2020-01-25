exports.getIndex = (req, res, next) => {
    res.render('app-interface/home', {
        pageTitle: 'Homepage',
        path: '/app-interface/home'
    });
};

exports.getFaturas = (req, res, next) => {
    res.render('app-interface/faturas', {
        pageTitle: 'Faturas',
        path: '/app-interface/faturas'
    });
};

exports.getEncomendas = (req, res, next) => {
    res.render('app-interface/Encomendas', {
        pageTitle: 'Encomendas',
        path: '/app-interface/faturas'
    });
};
