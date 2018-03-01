const express = require('express');
const router = express.Router();

const authenticationControllers = require('../controllers/authentication');

router.post('/', authenticationControllers.checkPassword);

module.exports = router;
