
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

// products.post('findOneAndDelete', async (data) => {
//     console.log(data)
//     console.log('post data delete!')
// })


const product_variants = mongoose.model('Variants', variants);
const products_data = mongoose.model('Products', products);

module.exports = { products_data, product_variants } 