const model = require('../models/index')
const Brand = model.product_brand;

const addProductBrand = async (req, res) =>{
    const data = req.body;
    await Brand.create(data).then(result=>{
        res.send({
            status: true,
            data: result,
            message: 'added product Brand'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const getAllProductBrand = async (req, res) => {
    await Brand.findAll({}).then(data=>{
        res.send({
            status: true,
            data: data,
            message: 'get all product Brand'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const updateProductBrand = async (req,res) => {
    const data = req.body;
    const id = req.params.id;
    await Brand.update(data, {
        where: {
            id: id
        }
    }).then(rowUpdate => {
        if(rowUpdate>0){
            res.send({
                status: true,
                message: 'Updated Success',
            })
        }else {
            res.send({
                status: true,
                message: 'Updated Failed',
            })
        }
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    });
}

const deleteProductBrand = async (req, res) => {
    const id = req.params.id;
    await Brand.destroy({
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
const getAllProductBrandByCategory = async (req, res) => {
    await Brand.findAll({
        where: {
            product_category_id: req.params.category_id
        }
    }).then(data=>{
        res.send({
            status: true,
            data: data,
            message: 'get all product Brand'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}
module.exports = {
    addProductBrand,
    getAllProductBrand,
    updateProductBrand,
    deleteProductBrand,
    getAllProductBrandByCategory
}
