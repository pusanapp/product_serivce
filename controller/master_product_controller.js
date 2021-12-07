const model = require('../models/index')
const Product = model.app_product;
const Barang = model.e_barang;
const ImageProduct = model.image_product;
const VideoProduct = model.video_product;
const Discount = model.app_product_discount;
const Combo = model.combo_product;
const NodeCache = require("node-cache");
const {paginate} = require("../utils/paginate");
const {Op, Sequelize} = require("sequelize");
const myCache = new NodeCache();

const addProduct = async (req, res) => {
    const body = req.body;
    const data = body.data;
    const images = body.images;
    const videos = body.videos;
    await Product.create(data).then(async (result) => {
        images.map(async (image)=>{
            const savedImage = {
                product_id: result.id,
                image_url: image,
                status: true
            }
            await ImageProduct.create(savedImage)
        })
        videos.map(async (video)=>{
            const savedImage = {
                product_id: result.id,
                video_url: video.url,
                status: true
            }
            await VideoProduct.create(savedImage)
        })
        await res.send({
            status: true,
            message: 'Product Added',
            data: result
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const checkCacheHafara = async (req, res, next) => {
    const value = myCache.get("hafara");
    if (value === undefined) {
        next()
    } else {
        res.send({
            status: true,
            data: value
        })
    }

}

const getHafaraProduct = async (req, res) => {
    await Barang.findAll({
        where: {
            company: 'Hafara'
        }
    }).then(data => {
        myCache.set("hafara", data, 1200);
        res.send({
            status: true,
            data: data
        })
    }).catch(err => {
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
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Product',
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

const getAllProductNew = async (req, res)=>{
    try {
        // get the query params
        const {q, page, limit, orderBy, orderDirection} = req.query;

        let search = {};
        let order = [];
        let include = [];

        include = [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company'],
                required: true
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
        // add the search term to the search object

        search = {
            [Op.or]: [
                {
                    "$hafara_product.stock$": {
                        [Op.like]: `%${q}%`,
                    },
                },
                {
                    name: {
                        [Op.like]: `%${q}%`,
                    },
                },
                {
                    code: {
                        [Op.like]: `%${q}%`,
                    },
                },
                {
                    brand: {
                        [Op.like]: `%${q}%`,
                    },
                },

                {
                    category: {
                        [Op.like]: `%${q}%`,
                    },
                },
            ],
        };


        // add the order parameters to the order
        if (orderBy && orderDirection) {
            order.push([Sequelize.col(orderBy), orderDirection]);
        }
        console.log('search, ', search)
        // paginate method that takes in the model, page, limit, search object, order and transform
        const result = await paginate(
            Product,
            page,
            limit,
            search,
            order,
            include
        );

        return res.status(200).send({
            status: true,
            message: "get all data",
            data: result,
        });
    } catch (err) {
        res.send({
            status: false,
            message: "error, " + err.message,
        });
    }
}
const updateProduct = async (req, res) => {
    const body = req.body;
    const data = body.data;
    const id = req.params.id;
    const images = body.images;
    const videos = body.videos;
    await Product.update(data, {
        where: {
            id: id
        }
    }).then(async (rowUpdate) => {
        if (rowUpdate > 0) {
            if(images){
                ImageProduct.destroy({
                    where: {
                        product_id: id
                    }
                })
                images.map(async (image)=>{
                    const savedImage = {
                        product_id: result.id,
                        image_url: image,
                        status: true
                    }
                    await ImageProduct.create(savedImage)
                })
            }
            if(videos){
                await VideoProduct.destroy({
                    where: {
                        product_id: id
                    }
                })
                videos.map(async (video)=>{
                    const savedImage = {
                        product_id: result.id,
                        video_url: video.url,
                        status: true
                    }
                    await VideoProduct.create(savedImage)
                })
            }

            res.send({
                status: true,
                message: 'Product Updated Success',
            })
        } else {
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

const getProductsByBrand = async (req, res) => {
    const brand = req.params.brand;
    await Product.findAll({
        where: {
            brand: brand
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Product By Brand ' + brand,
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    await Product.findAll({
        where: {
            category: category
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Product By Category ' + category,
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getProductsByType= async (req, res) => {
    const type = req.params.type;
    await Product.findAll({
        where: {
            type: type
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Product By Type ' + type,
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getPopularProduct = async (req, res) => {
    await Product.findAll({
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ],
        order: [
            ['seen', 'DESC']
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Popular Product',
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getBestSellerProduct = async (req, res) => {
    await Product.findAll({
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ],
        order: [
            ['sold', 'DESC']
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Best Seller Product',
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: `Err ${err.message}`,
        })
    })
}

const getNewProduct = async (req, res) => {
    await Product.findAll({
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'Load All Best Seller Product',
            data: data
        })
    }).catch(err => {
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

const updateSeenProduct = async (req, res) => {
    const productId = req.params.product_id;
    const currentProduct = await Product.findOne({where: {id: productId}})
    await Product.update(
        {
            seen: currentProduct.seen + 1
        }, {
            where: {
                id: productId
            }
        }
    ).then(rowUpdate => {
        if (rowUpdate > 0) {
            res.send({
                status: true,
                message: `update seen product to ${currentProduct.seen + 1}`
            })
        }
        res.send({
            status: false,
            message: 'update failed',
        })
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })

}

const updateSoldProduct = async (req, res) => {
    const productId = req.params.product_id;
    const data = req.body;
    const currentProduct = await Product.findOne({where: {id: productId}})
    await Product.update(
        {
            sold: currentProduct.sold + data.qty
        }, {
            where: {
                id: productId
            }
        }
    ).then(async (rowUpdate) => {
        if (rowUpdate > 0) {
            res.send({
                status: true,
                message: `update sold product to ${currentProduct.sold + data.qty}`
            })
        }
        res.send({
            status: false,
            message: 'update failed',
        })
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })
}

const updateStockBarang = async (req, res) => {
    const data = req.body;
    const idBarang = req.params.id_barang;
    const currentBarang = await Barang.findOne({where: {pid: idBarang}})
    await Barang.update({
        stock: currentBarang.stock - data.qty
    }, {
        where: {
            pid: idBarang
        }
    }).then(async (rowUpdate) => {
        if (rowUpdate > 0) {
            res.send({
                status: true,
                message: `update stock barang to ${currentBarang.stock - data.qty}`
            })
        }
        res.send({
            status: false,
            message: 'update failed',
        })
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })
}

const getStockHafara = async (req, res) => {
    const id = req.params.id;
    await Barang.findOne({
        where: {
            pid: id
        },
        attributes: ['stock']
    }).then(data => {
        res.send({
            status: true,
            data: data
        })
    }).catch(err => {
        res.send({
            status: false,
            message: err.message,
        })
    })
}

const getAvailableProduct = async (req, res) => {
    const data = req.body.data;
    const availProduct = []
    const unavilableProduct = []
    let count = 0
    data.map(async (product) => {
        const {dataValues} = await Barang.findOne({
            attributes: ['stock'],
            where: {
                pid: product.barang_id
            }
        })
        console.log(dataValues.stock)
        if(product.qty<=dataValues.stock) {
            product.current_stock = dataValues.stock
            availProduct.push(product)
        }else if(product.qty>dataValues.stock) {
            product.current_stock = dataValues.stock
            unavilableProduct.push(product)
        }
        count++
        if(count === data.length) {
            res.send({
                available: {
                    message: 'available product',
                    data: availProduct
                },
                unavailable: {
                    message: 'unavailable product',
                    data: unavilableProduct
                }
            })
        }
    })
    // await res.send({
    //     available: availProduct,
    //     unavailable: unavilableProduct
    // })
}
const findProductById = async (req, res) => {
    const id = req.params.id;
    await Product.findAll({
        where: {
            id: id
        },
        include: [
            {
                model: Barang,
                as: 'hafara_product',
                attributes: ['stock', 'company']
            },
            {
                model: ImageProduct,
                as: 'image_product'
            },
            {
                model: VideoProduct,
                as: 'video_product'
            },
            'app_product_discount',
            {
                model: Combo,
                as: 'include_combo',
                include: [
                    'app_products'
                ]
            }
        ]
    }).then(data => {
        res.send({
            status: true,
            message: 'find product',
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
module.exports = {
    addProduct,
    checkCacheHafara,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsByBrand,
    updateSoldProduct,
    updateSeenProduct,
    updateStockBarang,
    getPopularProduct,
    getBestSellerProduct,
    getNewProduct,
    getStockHafara,
    getHafaraProduct,
    getProductsByType,
    getAvailableProduct,
    getAllProductNew,
    findProductById
}
