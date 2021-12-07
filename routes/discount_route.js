const express = require('express');
const router = express.Router();
const discountController = require('../controller/master_discount_controller')

router.get('/discount/all', discountController.getAllDiscount)
router.get('/combo/all', discountController.getAllCombo)

router.get('/discount/:id', discountController.getDiscountById)
router.get('/combo/:id', discountController.getComboById)

router.post('/combo/new', discountController.createCombo)
router.post('/discount/new', discountController.createDiscount)

router.post('/discount/add-product', discountController.addNewProductDiscount)
router.post('/combo/add-product', discountController.addNewProductCombo)

router.put('/update/discount/:id', discountController.updateDiscount)
router.put('/update/combo/:id', discountController.updateCombo)

router.post('/discount/remove-product', discountController.removeProductDiscount)
router.post('/combo/remove-product', discountController.removeProductCombo)

router.delete('/combo/delete/:id', discountController.deleteCombo)
router.delete('/discount/delete/:id', discountController.deleteDiscount)



module.exports = router;
