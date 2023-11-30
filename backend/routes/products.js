const express = require('express');
const router = express.Router();
const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')

// GET ALL PRODUCTS ROUTE

router.get('/', async (req, res) => {
    // res.send("WELCOME TO PRODUCT PAGE")
    // display all products

    try {
        const allProducts = await products_data.find()
            .populate('variants')

        res.json(allProducts)

    } catch (error) {
        console.log(error)
        console.log("Get products route error!")
    }

})

// GET ALL VARIANTS ROUTE ( FOR TESTING PURPOSES )

router.get('/var', async (req, res) => {
    // res.send("VIEW VARIANT PAGE")
    // display all variants

    try {

        const allVariants = await product_variants.find()

        res.json(allVariants)

    } catch (error) {
        console.log(error)
        console.log("Get variants route error!")
    }

})

// GET SPECIFIC PRODUCT

router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id

        const productData = await products_data.findById({ _id: id }
        ).populate('variants')

        res.json(productData)

    } catch (error) {
        console.log(error)
        console.log("Get specific product route error!")
    }

})

// ADD PRODUCTS ROUTE

router.post('/addProducts', async (req, res) => {

    try {

        // create new products and save

        const newProduct = new products_data(

            req.body

        )

        await newProduct.save()

        // find for id reference of newProducts

        const findProduct = await products_data.findById(
            {
                _id: newProduct._id
            }
        )

        // create new variant and store the req.body in test arr, 

        const variantsArray = req.body.variantData

        // Iterate the objects in the array then save and push

        for (const object of variantsArray) {

            object.products = newProduct._id

            const newVariant = await product_variants(
                object
            )

            await newVariant.save()
            await findProduct.variants.push(newVariant)
        }

        // save the updated new product

        await findProduct.save()

        res.json(findProduct)

    } catch (error) {
        console.log(error)
        console.log("POST, Add products route error!")
    }

})

// ADD VARIANT ROUTE

router.post('/addVariants/:id', async (req, res) => {

    id = req.params.id

    const findProduct = await products_data.findById(
        {
            _id: id
        }
    )

    const variantsArray = req.body.variantData

    // Iterate the objects in the array then save and push

    for (const object of variantsArray) {

        object.products = findProduct._id

        const newVariant = await product_variants(
            object
        )

        await newVariant.save()
        await findProduct.variants.push(newVariant)
    }

    // save the updated new product

    await findProduct.save()

    res.json(findProduct)

})

// EDIT PRODUCT ROUTE

router.put('/editProduct/:id', async (req, res) => {

    try {

        const id = req.params.id

        const updateProduct = await products_data.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        )

        res.json(updateProduct)

    } catch (error) {
        console.log(error)
        console.log("PUT, Edit product route error!")
    }

})

// EDIT VARIANT ROUTE

router.put('/editVariant/:id', async (req, res) => {

    try {

        const id = req.params.id

        const updateVariant = await product_variants.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        )

        res.json(updateVariant)

    } catch (error) {
        console.log(error)
        console.log("PUT, Edit variant route error!")
    }

})


// DELETE PRODUCTS ROUTE

router.delete('/delProduct/:id', async (req, res) => {

    try {

        const id = req.params.id

        const delProduct = await products_data.findByIdAndDelete({ _id: id })
        await product_variants.deleteMany({ _id: delProduct.variants })
        res.json(delProduct)

    } catch (error) {
        console.log(error)
        console.log("DELETE, delete product route error!")
    }


})

// DELETE VARIANTS ROUTE

router.delete('/delVariant/:id', async (req, res) => {

    try {

        const id = req.params.id

        const delVariant = await product_variants.findOneAndDelete({ _id: id })
        res.json(delVariant)

    } catch (error) {
        console.log(error)
        console.log("DELETE, delete variant route error!")
    }

})


// -------------OLD CODE BACKUP----------------------------//

// // List all products

// router.get('/', async (req, res, next) => {

//     const productData = await products_data.find()
//         .catch(err => {
//             console.log("Server Error")
//             console.log(err)
//         })
//     res.send(productData)

// })

// // List all product variants

// router.get('/variants', async (req, res, next) => {

//     const productVariants = await product_variants.find()
//         .catch(err => {
//             console.log("Server Error")
//             console.log(err)
//         })
//     res.send(productVariants)
// })


// // Show specific product

// router.get('/:id', async (req, res) => {

//     try {

//         const id = req.params.id;
//         let data = [];

//         let getProduct = new Promise((resolve, reject) => {
//             resolve(data["product"] = products_data.findById(id))
//         })

//         let getVariant = new Promise((resolve, reject) => {
//             resolve(product_variants.find({ variant_id: id }))
//         })

//         Promise.all([getProduct, getVariant]).then((data) => res.json(data))

//     } catch (error) {
//         console.log(error)
//         console.log("Oh no! Server Error!")
//     }

// })

// // Add new product

// router.post('/addProducts', async (req, res) => {

//     try {

//         console.log(req.body)

//         const newProduct = new products_data(
//             req.body
//         )

//         let variantData = [
//             // req.body

//             {
//                 variant_size: "US_8",
//                 variant_price: 999
//             }

//         ]

//         const newVariants = product_variants(variantData)

//         newProduct.variants.push(newVariants)
//         // await newProduct.save()

//         console.log(newVariants)
//         // console.log(newProduct)

//         res.redirect('/products')

//     } catch (error) {
//         console.log("add products route error")
//         console.log(error)
//     }

// })

// // Edit product

// router.put('/editProducts/:id', async (req, res) => {

//     const id = req.params.id

//     await products_data.findByIdAndUpdate(
//         { _id: id },
//         { $set: req.body }
//     )
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.log("Server Error")
//             console.log(err)
//         })
// })

// // Delete product

// router.delete('/delete/:id', async (req, res) => {

//     try {

//         const id = req.params.id;

//         await products_data.findByIdAndDelete(id)
//         await product_variants.deleteMany({ variant_id: id })

//     } catch (error) {

//         console.log("Delete Route Error")
//         console.log(error)

//     }
// })

module.exports = router;