const express = require('express');
const router = express.Router();
const bannerController = require('../controller/master_banner_controller')


router.get('/all', bannerController.getAllBanner)

module.exports = router;
