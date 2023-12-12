const mongoose = require('mongoose');
const { Schema } = mongoose;

const variants = new Schema({

    user_category: {
        type: String,
        required: true,
    },

    variant_size: {
        type: Number,
    },

    apparel_size: {
        type: String,
    },

    variant_price: {
        type: Number,
        required: true,
    },

    number_of_stocks: {
        type: Number,
        required: true,
    },

    products: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }

})

const product_variants = mongoose.model('Variants', variants);

module.exports = { product_variants }