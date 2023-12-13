const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')
const { catchAsync } = require('../errors/errorHandler')

// UPLOAD IMAGE MODULES

// const { storage } = require('../cloudinary')
// const multer = require('multer')
// const upload = multer(storage)


// ------------ GET ROUTES ------------


// GET ALL PRODUCTS ROUTE

router.route('/')
    .get(catchAsync(productController.getProducts()))

// GET ALL VARIANTS ROUTE 

router.route('/var')
    .get(catchAsync(productController.getVariants()))

// FILTER OPTIONS ROUTE

router.route('/filterOptions')
    .get(catchAsync(productController.filterOptions()))

// GET SPECIFIC PRODUCT

router.route('/:id')
    .get(catchAsync(productController.findProduct()))


// ------------ POST ROUTES ------------

// TEST ROUTE

router.route('/test')
    .post(catchAsync(productController.codeTesting()))

// ADD PRODUCTS ROUTE

router.route('/addProducts')
    .post(catchAsync(productController.addProducts()))


// ADD VARIANT ROUTE

router.route('/addVariants/:id')
    .post(catchAsync(productController.addVariants()))


// ------------ PUT ROUTES ------------


// EDIT PRODUCT ROUTE

router.route('/editProduct/:id')
    .put(catchAsync(productController.editProduct()))

// EDIT VARIANT ROUTE

router.route('/editVariant/:id')
    .put(catchAsync(productController.editVariant()))


// ------------ DELETE ROUTES ------------


// DELETE PRODUCTS ROUTE

router.route('/delProduct/:id')
    .delete(catchAsync(productController.deleteProduct()))

// DELETE VARIANTS ROUTE

router.route('/delVariant/:id')
    .delete(catchAsync(productController.deleteVariant()))


// ---------------------------------------

module.exports = router;