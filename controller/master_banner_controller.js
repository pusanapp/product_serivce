const model = require('../models/index')
const Banner = model.app_banner;

const getAllBanner = async (req,res)=>{
    await Banner.findAll({}).then(data=>{
        res.send({
            data: data
        })
    })
}

module.exports = {
    getAllBanner
}
