const express = require('express');
const router = express.Router();

const authenticationControllers = require('../controllers/authentication');

router.post('/', authenticationControllers.checkPassword);

router.post('/refresh', authenticationControllers.refreshToken);

module.exports = router;
