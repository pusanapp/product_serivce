const express = require('express');
const router = express.Router();
const productController = require('../controller/master_product_controller')
const productTypeController = require('../controller/master_product_type_controller')
const productCategoryController = require('../controller/master_product_category_controller')
const productBrandController = require('../controller/master_product_brand_controller')

router.get('/all', productController.getAllProduct)
router.get('/all/popular', productController.getPopularProduct)
router.get('/all/best-seller', productController.getBestSellerProduct)
router.get('/all/new', productController.getNewProduct)
router.get('/all/category/:category', productController.getProductsByCategory)
router.get('/all/brand/:brand', productController.getProductsByBrand)
router.post('/add', productController.addProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.put('/update/sold/:product_id', productController.updateSoldProduct)
router.put('/update/seen/:product_id', productController.updateSeenProduct)
router.put('/update/stock/:id_barang', productController.updateStockBarang)
router.get('/stock/hafara/:id', productController.getStockHafara)

router.post('/type/add',productTypeController.addProductType )
router.get('/type/all',productTypeController.getAllProductType )
router.put('/type/update/:id',productTypeController.updateProductType )
router.delete('/type/delete/:id',productTypeController.deleteProductType )

router.post('/category/add',productCategoryController.addProductCategory )
router.get('/category/all',productCategoryController.getAllProductCategory )
router.get('/category/all/:type_id',productCategoryController.getAllProductCategoryByProductType )
router.put('/category/update/:id',productCategoryController.updateProductCategory )
router.delete('/category/delete/:id',productCategoryController.deleteProductCategory )

router.post('/brand/add',productBrandController.addProductBrand )
router.get('/brand/all',productBrandController.getAllProductBrand )
router.get('/brand/all/:category_id',productBrandController.getAllProductBrandByCategory )
router.put('/brand/update/:id',productBrandController.updateProductBrand )
router.delete('/brand/delete/:id',productBrandController.deleteProductBrand )

module.exports = router;
