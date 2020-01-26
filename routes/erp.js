const express = require('express');

const erpController = require('../controllers/erp');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/erp/faturas', erpController.getFaturas);

router.get('/erp/faturas/:id', erpController.getFaturaByID);

router.get('/erp/encomendas', erpController.getEncomendas);

module.exports = router;
