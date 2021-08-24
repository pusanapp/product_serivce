const model = require('../models/index')
const Type = model.product_type;

const addProductType = async (req, res) =>{
    const data = req.body;
    await Type.create(data).then(result=>{
        res.send({
            status: true,
            data: result,
            message: 'added product type'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const getAllProductType = async (req, res) => {
    await Type.findAll({}).then(data=>{
        res.send({
            status: true,
            data: data,
            message: 'get all product type'
        })
    }).catch(err=>{
        res.send({
            message: err.message,
            status: false
        })
    })
}

const updateProductType = async (req,res) => {
    const data = req.body;
    const id = req.params.id;
    await Type.update(data, {
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

const deleteProductType = async (req, res) => {
    const id = req.params.id;
    await Type.destroy({
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
    addProductType,
    getAllProductType,
    updateProductType,
    deleteProductType
}
