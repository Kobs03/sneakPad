const mongoose = require('mongoose');
const { Schema } = mongoose;

const variants = new Schema({

    products_id_ref: { type: Schema.Types.ObjectId, ref: 'Products' },

    shoes_sizes: { type: Number, default: null },

    apparel_sizes: { type: String, default: null },

    variant_price: { type: Number, required: true, },

    variant_stocks: { type: Number, required: true }

    // is_onSale: Boolean
    // sale_percentage : Number
    // sale duration [ {start:""}, {end:""}]

})

const product_variants = mongoose.model('Variants', variants);

module.exports = { product_variants }