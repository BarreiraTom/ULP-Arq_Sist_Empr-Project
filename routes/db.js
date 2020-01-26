const express = require('express');

const dbController = require('../controllers/db');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/db/faturas', dbController.getDBFaturas);

router.get('/db/encomendas', dbController.getDBEncomendas);

module.exports = router;
