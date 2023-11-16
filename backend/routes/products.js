const express = require('express');
const router = express.Router();
const products = require('../models/productModel')

router.get('/', async (req, res) => {
    const productItem = await products.find();
    res.send(productItem)
})

router.post('/addProducts', async (req, res) => {
    const newProduct = new products (req.body)
    console.log(newProduct)
    // newProduct.save()
})

module.exports = router;