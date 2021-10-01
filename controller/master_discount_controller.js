const model = require('../models/index')
const Combo = model.combo_product;
const Discount = model.app_product_discount;
const Product = model.app_product;

const getAllDiscount = async (req, res) => {
    await Discount.findAll({
        include: [
            'app_product'
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'get all Discount',
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

const updateCombo = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Combo.update(data, {
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

const updateDiscount = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Discount.update(data, {
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

const createCombo = async (req, res) => {
    const body = req.body;
    const data = body.data;
    const products = body.products;
    await Combo.create(data).then(async (result) => {
        const updateProduct = {
            combo_id: result.id,
            combo_name: result.name,
        }
        products.map(async (product) => {
            await Product.update(updateProduct, {
                where: {
                    id: product.id
                }
            })
        })
        await res.send({
            status: true,
            message: 'Combo Added',
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

const createDiscount = async (req, res) => {
    const body = req.body;
    const data = body.data;
    const products = body.products;
    await Discount.create(data).then(async (result) => {
        const updateProduct = {
            app_discount_id: result.id,
            discount_name: result.name,
        }
        products.map(async (product) => {
            await Product.update(updateProduct, {
                where: {
                    id: product.id
                }
            })
        })
        await res.send({
            status: true,
            message: 'Discount Added',
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

const addNewProductCombo = async (req, res) => {
    const products = req.body.products;
    const combo = req.body.combo;
    const updateProduct = {
        combo_id: combo.id,
        combo_name: combo.name,
    }
    products.map(async (product) => {
        await Product.update(updateProduct, {
            where: {
                id: product.id
            }
        })
    })
    await res.send({
        status: true,
        message: 'new Product combo Added',
    })
}

const addNewProductDiscount = async (req, res) => {
    const products = req.body.products;
    const discount = req.body.discount;
    const updateProduct = {
        app_discount_id: discount.id,
        discount_name: discount.name,
    }
    products.map(async (product) => {
        await Product.update(updateProduct, {
            where: {
                id: product.id
            }
        })
    })
    await res.send({
        status: true,
        message: 'new Product discount Added',
    })
}

const removeProductCombo = async (req, res) => {
    const products = req.body.products;
    const updateProduct = {
        combo_id: null,
        combo_name: null,
    }
    products.map(async (product) => {
        await Product.update(updateProduct, {
            where: {
                id: product.id
            }
        })
    })
    await res.send({
        status: true,
        message: 'product combo removed',
    })
}

const removeProductDiscount = async (req, res) => {
    const products = req.body.products;
    const updateProduct = {
        app_discount_id: null,
        discount_name: null,
    }
    products.map(async (product) => {
        await Product.update(updateProduct, {
            where: {
                id: product.id
            }
        })
    })
    await res.send({
        status: true,
        message: 'product discount removed',
    })
}


const getAllCombo = async (req, res) => {
    await Combo.findAll({
        include: [
            'app_products'
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'get all Discount',
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

const deleteCombo = async (req, res) => {
    const id = req.params.id;
    await Product.destroy({
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
            await Product.update({
                combo_id: null,
                combo_name: null,
            }, {
                where: {
                    combo_id: id
                }
            })
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

const deleteDiscount = async (req, res) => {
    const id = req.params.id;
    await Discount.destroy({
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
            await Product.update({
                app_discount_id: null,
                discount_name: null,
            }, {
                where: {
                    app_discount_id: id
                }
            })
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
    getAllDiscount,
    getAllCombo,
    addNewProductDiscount,
    addNewProductCombo,
    createDiscount,
    createCombo,
    updateDiscount,
    updateCombo,
    removeProductDiscount,
    removeProductCombo,
    deleteCombo,
    deleteDiscount
}
