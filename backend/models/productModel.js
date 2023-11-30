
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

    // product_img: {
    //     type: [String],
    //     required: false,
    // },

    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variants'
        }
    ]

})

// products.post('findOneAndDelete', async (data) => {
//     console.log(data)
//     console.log('post data delete!')
// })

const products_data = mongoose.model('Products', products);

module.exports = { products_data } 