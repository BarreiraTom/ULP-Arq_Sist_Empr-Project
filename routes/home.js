const express = require('express');

const homeController = require('../controllers/home');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/axios', homeController.getAxios);

module.exports = router;
