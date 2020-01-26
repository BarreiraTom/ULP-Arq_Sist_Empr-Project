const Faturas= require("../models/faturas");
const Encomendas= require("../models/encomendas");

exports.getDBFaturas= (req, res, next) => {
    Faturas.find().then((faturas) => {
        console.log(faturas);
        res.render('app-interface/db/faturas', {
            pageTitle: 'DB Faturas',
            path: '/app-interface/db/faturas',
            faturas: faturas
        });
    })
}

exports.getDBEncomendas= (req, res, next) => {
    Encomendas.find().then((encomendas) => {
        console.log(encomendas);
        res.render('app-interface/db/encomendas', {
            pageTitle: 'DB Encomendas',
            path: '/app-interface/db/encomendas',
            encomendas: encomendas
        });
    })
}
