const express = require('express');

const erpController = require('../controllers/erp');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/erp/faturas', erpController.getFaturas);

router.get('/erp/fatura/:id', erpController.getFaturaByID);

router.get('/erp/fatura-pdf/:id', erpController.getFaturaByIDPDF);

router.get('/erp/encomendas', erpController.getEncomendas);

router.get('/erp/encomenda/:id', erpController.getEncomendaByID);


module.exports = router;
