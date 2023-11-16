const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({

    productName: String,
    productBrand: String,
    productDescription: String,
    productCategory: String,
    productPrice: Number,
    productStocks: Number,

})

module.exports = mongoose.model('Products',productSchema)