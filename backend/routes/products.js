const express = require('express');
const router = express.Router();
const { products_data, product_variants } = require('../models/productModel')

// List all products

router.get('/', async (req, res, next) => {

    const productData = await products_data.find()
        .catch(err => {
            console.log("Server Error")
            console.log(err)
        })
    res.send(productData)
})

// List all product variants

router.get('/variants', async (req, res, next) => {

    const productVariants = await product_variants.find()
        .catch(err => {
            console.log("Server Error")
            console.log(err)
        })
    res.send(productVariants)
})


// Show specific product

router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;
        let data = [];

        let getProduct = new Promise((resolve, reject) => {
            resolve(data["product"] = products_data.findById(id))
        })

        let getVariant = new Promise((resolve, reject) => {
            resolve(product_variants.find({ variant_id: id }))
        })

        Promise.all([getProduct, getVariant]).then((data) => res.json(data))

    } catch (error) {
        console.log(error)
        console.log("Oh no! Server Error!")
    }

})

// Add new product

router.post('/addProducts', async (req, res) => {

    try {
        const newProduct = new products_data(req.body)

        await newProduct.save()

        const newVariants = product_variants.insertMany(
            [
                // req.body

                {
                    variant_id: newProduct._id,
                    variant_size: "US_1",
                    variant_price: 5299,
                    number_of_stocks: 3
                },
                {
                    variant_id: newProduct._id,
                    variant_size: "US_2",
                    variant_price: 5299,
                    number_of_stocks: 3
                },
                {
                    variant_id: newProduct._id,
                    variant_size: "US_3",
                    variant_price: 5299,
                    number_of_stocks: 3
                },
            ]
        )

        console.log(newVariants)
        res.redirect('/products')

    } catch (error) {
        console.log("add products route error")
        console.log(error)
    }

})

// Edit product

router.put('/editProducts/:id', async (req, res) => {

    const id = req.params.id

    await products_data.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }
    )
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log("Server Error")
            console.log(err)
        })
})

// Delete product

router.delete('/delete/:id', async (req, res) => {

    try {

        const id = req.params.id;

        await products_data.findByIdAndDelete(id)
        await product_variants.findByIdAndRemove({ variant_id: id })

    } catch (error) {

        console.log("Delete Route Error")
        console.log(error)

    }
})

module.exports = router;