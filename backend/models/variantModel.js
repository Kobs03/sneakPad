const mongoose = require('mongoose');
const { Schema } = mongoose;

// const variants = new Schema({

//     user_category: { type: String, required: true, },

//     variant_price: { type: Number, required: true, },

//     variant_size: { type: Number },

//     apparel_size: { type: String },

//     number_of_stocks: { type: Number, required: true },

//     products: { type: Schema.Types.ObjectId, ref: 'Products' }

// })

const variants = new Schema({

    products_id_ref: { type: Schema.Types.ObjectId, ref: 'Products' },

    variant_size: { type: Number },

    variant_price: { type: Number, required: true, },

    variant_stocks: { type: Number, required: true }

    // is_onSale: Boolean
    // sale_percentage : Number
    // sale duration [ {start:""}, {end:""}]

})


const product_variants = mongoose.model('Variants', variants);

module.exports = { product_variants }