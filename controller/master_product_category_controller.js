const model = require('../models/index')
const Category = model.product_category;

const addProductCategory = async (req, res) =>{
    const data = req.body;
    await Category.create(data).then(result=>{
        res.send({
            status: true,
            data: result,
            message: 'added product category'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const getAllProductCategory = async (req, res) => {
    await Category.findAll({}).then(data=>{
        res.send({
            status: true,
            data: data,
            message: 'get all product category'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const updateProductCategory = async (req,res) => {
    const data = req.body;
    const id = req.params.id;
    await Category.update(data, {
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

const deleteProductCategory = async (req, res) => {
    const id = req.params.id;
    await Category.destroy({
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
    addProductCategory,
    getAllProductCategory,
    updateProductCategory,
    deleteProductCategory
}
