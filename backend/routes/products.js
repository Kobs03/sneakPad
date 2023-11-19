const express = require('express');
const router = express.Router();
const products = require('../models/productModel')

// List all products

router.get('/', async (req, res) => {
    const productItem = await products.find()
        .catch(err => {
            console.log("Server Error")
            console.log(err)
        })
    res.send(productItem)
})

// Show specific product

router.get('/:id', async (req, res) => {
    const getProduct = await products.findById(
        { _id: req.params.id }
    ).catch(err => {
        console.log("Server Error")
        console.log(err)
    })
    res.json(getProduct)
    console.log(getProduct)
})

// Add new product

router.post('/addProducts', async (req, res) => {
    const newProduct = new products(req.body)
    console.log(newProduct)
    newProduct.save()
        .then((data) => {
            console.log(data)
            res.redirect('/products')
        })
        .catch(error => {
            console.log("Server Error")
            console.log(error)
        })

})

// Edit product

router.put('/editProducts/:id', async (req, res) => {

    const id = req.params.id

    await products.findByIdAndUpdate(
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
    await products.findByIdAndDelete(
        { _id: req.params.id },
    ).catch(err => {
        console.log("Server Error")
        console.log(err)
    })
})

module.exports = router;