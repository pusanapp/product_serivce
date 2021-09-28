const express = require('express');
const router = express.Router();
const discountController = require('../controller/master_discount_controller')

router.get('/discount/all', discountController.getAllDiscount)
router.get('/combo/all', discountController.getAllCombo)



module.exports = router;
