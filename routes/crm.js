const express = require('express');

const crmController = require('../controllers/crm');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/crm/faturas', crmController.getCRMFaturas);

router.post('/crm/insert-fatura', crmController.postCRMFatura);

router.get('/crm/encomendas', crmController.getCRMEncomendas);

router.post('/crm/insert-encomenda', crmController.postCRMEncomendas);

module.exports = router;
