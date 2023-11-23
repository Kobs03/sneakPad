const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const product_variants = mongoose.model('Variants', variants);

module.exports =  product_variants 