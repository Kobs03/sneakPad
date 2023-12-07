
const mongoose = require('mongoose');
const { Schema } = mongoose

const products = new Schema({

    product_name: {
        type: String,
        required: true,
    },

    product_brand: {
        type: String,
        required: true,
    },

    product_description: {
        type: String,
        required: true,
    },

    product_category: {
        type: String,
        required: true,
    },

    product_img: [
        {
            img_name: {
                type: String,
                required: true,
            },
            img_url: {
                type: String,
                required: true,
            }
        }
    ],

    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variants',
        }
    ]

})

// products.post('findOneAndDelete', async (data) => {
//     console.log(data)
//     console.log('post data delete!')
// })

const products_data = mongoose.model('Products', products);

module.exports = { products_data } 