const model = require('../models/index')
const Product = model.app_product;
const Barang = model.e_barang;
const ImageProduct = model.image_product;
const VideoProduct = model.video_product;

const addProduct = async (req, res) => {
    const data = req.body;
    await Product.create(data).then(result=>{
        res.send({
            status: true,
            message: 'Product Added',
            data: result
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getAllProduct = async (req, res) => {
    await Product.findAll({
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock','company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'discount_product',
            'combo_product'
        ]
    }).then(data=>{
        res.send({
            status: true,
            message: 'Load All Product',
            data: data
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const updateProduct = async (req,res) => {
    const data = req.body;
    const id = req.params.id;
    await Product.update(data, {
        where: {
            id: id
        }
    }).then(rowUpdate => {
        if(rowUpdate>0){
            res.send({
                status: true,
                message: 'Product Updated Success',
            })
        }else {
            res.send({
                status: true,
                message: 'Product Updated Failed',
            })
        }
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    });
}

const getProductsByBrand= async (req,res) => {
    const brand = req.params.brand;
    await Product.findAll({
        where: {
            brand: brand
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock','company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'discount_product',
            'combo_product'
        ]
    }).then(data=>{
        res.send({
            status: true,
            message: 'Load All Product By Brand '+brand,
            data: data
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getProductsByCategory= async (req,res) => {
    const category = req.params.category;
    await Product.findAll({
        where: {
            category: category
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock','company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'discount_product',
            'combo_product'
        ]
    }).then(data=>{
        res.send({
            status: true,
            message: 'Load All Product By Category '+category,
            data: data
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.destroy({
        where: {
            id: id
        }
    }).then(result => {
        if (!result) {
            res.send({
                status: false,
                message: 'Delete Failed',
            })
        }
        res.send({
            status: true,
            message: 'Delete Success',
        })
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })
}

module.exports = {
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsByBrand
}
