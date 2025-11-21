const express = require('express');
const router = express.Router();
const { getAll, getById, create, remove } = require('../controllers/product.controller');
const { auth, authorize } = require('../middlewares/auth.middleware');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, authorize(['admin']), create);
router.delete('/:id', auth, authorize(['admin']), remove);

module.exports = router;
