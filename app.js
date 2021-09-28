const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");
const cors = require("cors");

const indexRouter = require('./routes/index');
const productRouter = require('./routes/product_route');
const discountRouter = require('./routes/discount_route')
const bannerRouter = require('./routes/banner_route')
const app = express();

app.use(cors());
app.use(
    fileUpload({
        createParentPath: true,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/pusan/product', productRouter)
app.use('/api/v1/master', discountRouter)
app.use('/api/v1/banner', bannerRouter)
module.exports = app;
