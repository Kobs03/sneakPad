
const mongoose = require('mongoose');
const { Schema } = mongoose

const products = new Schema({

    product_name: {
        type: String,
        required: false,
    },

    product_brand: {
        type: String,
        required: false,
    },

    product_description: {
        type: String,
        required: false,
    },

    product_category: {
        type: String,
        required: false,
    },

    user_category: {
        type: String,
        required: false,
    },

    product_img: {
        type: [String],
        required: false,
    },

})



const variants = new Schema({

    variant_id: {
        type: String,
        required: false,
    },

    variant_size: {
        type: String,
        required: false,
    },

    variant_price: {
        type: Number,
        required: false,
    },

    number_of_stocks: {
        type: Number,
        required: false,
    }

})

const products_data = mongoose.model('Products', products);
const product_variants = mongoose.model('Variants', variants);

module.exports = { products_data, product_variants }
