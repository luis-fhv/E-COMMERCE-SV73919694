const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register', register);

router.post('/register', require('../controllers/auth.controller').register);


module.exports = router;
