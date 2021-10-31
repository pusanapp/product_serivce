const model = require('../models/index')
const Banner = model.app_banner;
const Discount = model.app_product_discount;

const getAllBanner = async (req,res)=>{
    await Banner.findAll({
        include: ['app_product_discount']
    }).then(data=>{
        res.send({
            status: true,
            message: 'get all Banner',
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getAllActiveBanner = async (req,res)=>{
    await Banner.findAll({
        where: {
            show: true
        }
    }).then(data=>{
        res.send({
            status: true,
            message: 'get all Banner',
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const createBanner = async (req, res) => {
    const data = req.body;
    await Banner.create(data).then(result => {
        res.send({
            status: true,
            message: 'Banner Created',
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const updateBanner= async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Banner.update(data, {
        where: {
            id: id
        }
    }).then(rowUpdate => {
        if (rowUpdate > 0) {
            res.send({
                status: true,
                message: 'update success'
            })
        } else {
            res.send({
                status: false,
                message: 'update failed'
            })
        }
    }).catch(err => {
        console.log(err)
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const deleteBanner = async (req, res) => {
    const id = req.params.id;
    await Banner.destroy({
        where: {
            id: id
        }
    }).then(async (result) => {
        if (!result) {
            res.send({
                status: false,
                message: 'Delete Failed',
            })

        } else {
            await res.send({
                status: true,
                message: 'Delete Success',
            })
        }
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })
}

module.exports = {
    getAllBanner,
    createBanner,
    updateBanner,
    deleteBanner,
    getAllActiveBanner
}
