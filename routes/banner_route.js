const express = require('express');
const router = express.Router();
const bannerController = require('../controller/master_banner_controller')


router.get('/all', bannerController.getAllBanner)
router.get('/all/active', bannerController.getAllActiveBanner)
router.post('/create', bannerController.createBanner)
router.put('/update/:id', bannerController.updateBanner)
router.delete('/delete/:id', bannerController.deleteDiscount)

module.exports = router;
