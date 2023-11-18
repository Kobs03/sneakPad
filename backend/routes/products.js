const express = require('express');
const router = express.Router();
const products = require('../models/productModel')

// List all products

router.get('/', async (req, res) => {
    const productItem = await products.find();
    res.send(productItem);
})

// Show specific product

router.get('/:id', async (req, res) => {
    const getProduct = await products.findById(
        { _id: req.params.id }
    )
    res.json(getProduct)
    console.log(getProduct)
})

// Add new product

router.post('/addProducts', async (req, res) => {
    const newProduct = new products(req.body)
    console.log(newProduct)
    newProduct.save()
})

// Edit product

router.put('/editProduct/:id', async (req, res) => {
    const editProduct = await products.updateOne(
        { $set: req.body }
    )
    res.send(editProduct);
})

// Delete product

module.exports = router;