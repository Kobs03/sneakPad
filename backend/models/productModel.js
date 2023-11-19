const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({

    productName: {
        type: String,
        required: true,
    },
    productBrand: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productStocks: {
        type: Number,
        required: true,
    },
    productImg: {
        type: [String],
        required: true,
    },
})



module.exports = mongoose.model('Products', productSchema)

