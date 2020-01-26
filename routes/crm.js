const express = require('express');

const crmController = require('../controllers/crm');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/crm/faturas', crmController.getCRMFaturas);

module.exports = router;
