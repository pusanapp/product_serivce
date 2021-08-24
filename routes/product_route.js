const express = require('express');
const router = express.Router();
const productController = require('../controller/master_product_controller')
const productTypeController = require('../controller/master_product_type_controller')
const productCategoryController = require('../controller/master_product_category_controller')
const productBrandController = require('../controller/master_product_brand_controller')

router.get('/all', productController.getAllProduct)
router.post('/add', productController.addProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)

router.post('/type/add',productTypeController.addProductType )
router.get('/type/all',productTypeController.getAllProductType )
router.put('/type/update/:id',productTypeController.updateProductType )
router.delete('/type/delete/:id',productTypeController.deleteProductType )

router.post('/category/add',productCategoryController.addProductCategory )
router.get('/category/all',productCategoryController.getAllProductCategory )
router.put('/category/update/:id',productCategoryController.updateProductCategory )
router.delete('/category/delete/:id',productCategoryController.deleteProductCategory )

router.post('/brand/add',productBrandController.addProductBrand )
router.get('/brand/all',productBrandController.getAllProductBrand )
router.put('/brand/update/:id',productBrandController.updateProductBrand )
router.delete('/brand/delete/:id',productBrandController.deleteProductBrand )

module.exports = router;
