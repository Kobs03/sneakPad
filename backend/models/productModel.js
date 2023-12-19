
const mongoose = require('mongoose');
const { Schema } = mongoose

const products = new Schema({

    product_name: { type: String, required: true },

    product_brand: { type: String, required: true },

    product_description: { type: String, required: true },

    product_type: { type: String, required: true }, // Shoes || Apparel

    product_category: { type: String, required: true }, // if shoes => Casual, Running, etc

    gender: { type: String, required: true, },

    product_img: [
        {
            img_name: { type: String, required: false },
            img_url: { type: String, required: false }
        }
    ],

    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variants',
        }
    ]

})

const products_data = mongoose.model('Products', products);

module.exports = { products_data } 