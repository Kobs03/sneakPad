const express = require('express');
const router = express.Router();
const products = require('../models/productModel')

router.get('/', async (req, res) => {
    const productItem = await products.find();
    res.send(productItem)
})

module.exports = router;