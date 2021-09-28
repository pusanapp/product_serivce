const model = require('../models/index')
const Combo = model.combo_product;
const Discount = model.app_product_discount;

const getAllDiscount = async (req, res) => {
    await Discount.findAll({
        include: [
            'app_product'
        ]
    }).then(data=>{
        res.send({
            data: data
        })
    })
}

const getAllCombo = async (req, res) => {
    await Combo.findAll({
        include: [
            'app_products'
        ]
    }).then(data=>{
        res.send({
            data: data
        })
    })
}

module.exports = {
    getAllDiscount,
    getAllCombo
}
