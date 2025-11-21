const express = require('express');
const router = express.Router();
const { createOrder, getHistory } = require('../controllers/order.controller');
const { auth } = require('../middlewares/auth.middleware');

router.post('/', auth, createOrder);
router.get('/history', auth, getHistory);

module.exports = router;
