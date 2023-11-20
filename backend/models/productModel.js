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

    userCategory: {
        type: String,
        required: true,
    },

    productPrice: {
        type: Number,
        required: true,
    },

    sizes: {
        small: Number,
        medium: Number,
        large: Number,
    },

    productImg: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model('Products', productSchema)

