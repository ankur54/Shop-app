const express = require('express');
const path = require('path');

const dir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-products', adminController.getAddProducts);
router.get('/edit-product/:productId', adminController.getAddProducts);
router.post('/add-products', adminController.postAddProducts);
router.post('/edit-product', adminController.postEditProducts);
router.post('/delete-product', adminController.postDeleteProducts);
router.get('/products', adminController.adminProducts);

module.exports = router;