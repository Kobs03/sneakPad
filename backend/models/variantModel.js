const mongoose = require('mongoose');
const { Schema } = mongoose;

const variants = new Schema({

    user_category: {
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
    },

    products: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }

})

const product_variants = mongoose.model('Variants', variants);

module.exports = { product_variants }