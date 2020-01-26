const express = require('express');

const homeController = require('../controllers/home');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/faturas', homeController.getFaturas);
router.get('/faturas/:id', homeController.getFaturaByID);

router.get('/faturas/:id', homeController.getFaturaByID);

router.get('/encomendas', homeController.getEncomendas);

module.exports = router;
