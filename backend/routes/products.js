const express = require('express');
const router = express.Router();


// UPLOAD IMAGE MODULES

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { storage } = require('../cloudinary')
const multer = require('multer')
const upload = multer(storage)

// SCHEMAS

const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')

// GET ALL PRODUCTS ROUTE

router.get('/', async (req, res) => {

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

router.post('/addProducts', upload.array("image"), async (req, res) => {

    try {

        // image upload

        let uploadFromBuffer = (req, index) => {

            return new Promise((resolve, reject) => {

                let cld_upload_stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "sneak_pad"
                    },
                    (error, result) => {

                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.files[index].buffer).pipe(cld_upload_stream);

            });

        };

        let imgData = []

        for (let i = 0; i < req.files.length; i++) {
            let uploadedImg = await uploadFromBuffer(req, i);
            console.log(uploadedImg)
            let imgResult = {
                img_name: uploadedImg.public_id,
                img_url: uploadedImg.url
            }
            imgData.push(imgResult)
        }

        // create new products and save

        req.body.product_img = imgData

        const newProduct = new products_data(
            req.body,
        )

        await newProduct.save()

        // find for id reference of newProducts

        const findProduct = await products_data.findById(
            {
                _id: newProduct._id
            }
        )

        // create new variant and store the req.body in test arr, 

        const variantsArray = JSON.parse(req.body.variantData)

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

        console.log("Products Successfully added! " + findProduct)

        res.redirect("/products")

    } catch (error) {
        console.log(error)
        console.log("POST, Add products route error!")
    }

})

// ADD VARIANT ROUTE

router.post('/addVariants/:id', async (req, res) => {

    try {
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

        console.log("Variants Successfully added! " + findProduct)

        res.json(findProduct)

    } catch (error) {
        console.log(error)
        console.log("ADD VARIANTS ROUTE ERROR!")
    }

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

        console.log("EDIT PRODUCT SUCCESSFUL")

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

        console.log("Edited successfully")

    } catch (error) {
        console.log(error)
        console.log("PUT, Edit variant route error!")
    }

})


// DELETE PRODUCTS ROUTE

router.delete('/delProduct/:id', async (req, res) => {

    try {

        const id = req.params.id

        const products = await products_data.findById({ _id: id })

        for (images of products.product_img) {
            const toDelete = await cloudinary.uploader.destroy(images.img_name)
            console.log("Successfuly delted: " + toDelete)
        }

        const delProduct = await products_data.findByIdAndDelete({ _id: id })
        await product_variants.deleteMany({ _id: delProduct.variants })

        console.log("Deleted Product: " + delProduct)
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

        console.log("Deleted Variant " + delVariant)

    } catch (error) {
        console.log(error)
        console.log("DELETE, delete variant route error!")
    }

})

module.exports = router;

//--------------------------------------------------------------------------

// TEST ROUTES FOR FEATURES REFERENCE !!!

// router.post('/test', upload.single("image"), (req, res) => {
//     try {
//         console.log("route reached!")
//         console.log(req.file)
//         console.log('////////////////////////////////////////////////////')

//         if (req.file) {
//             let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "sneak_pad" },
//                 function (error, result) {
//                     console.log(error, result);
//                 });

//             streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
//         }

//     } catch (error) {
//         console.log(error)
//         console.log("test route error")
//     }
// })

// // ANOTHER TEST ROUTE

// router.post('/test1', upload.array("image"), async (req, res) => {

//     let uploadFromBuffer = (req, index) => {

//         return new Promise((resolve, reject) => {

//             let cld_upload_stream = cloudinary.uploader.upload_stream(
//                 {
//                     folder: "sneak_pad"
//                 },
//                 (error, result) => {

//                     if (result) {
//                         resolve(result);
//                     } else {
//                         reject(error);
//                     }
//                 }
//             );

//             streamifier.createReadStream(req.files[index].buffer).pipe(cld_upload_stream);

//         });

//     };

//     let imgData = []

//     for (let i = 0; i < req.files.length; i++) {
//         let uploadedImg = await uploadFromBuffer(req, i);
//         console.log(uploadedImg)
//         let imgResult = {
//             img_name: uploadedImg.public_id,
//             img_url: uploadedImg.url
//         }
//         imgData.push(imgResult)
//     }

//     console.log(imgData)

//     let variants = JSON.parse(req.body.variantData)

//     // console.log(req.files)
//     console.log(variants)
//     res.json(req.body)

//     // console.log(...req.files)

// })

// // IMAGE DELETE TEST ROUTE

// router.post("/delImage", async (req, res) => {
//     const toDelete = await cloudinary.uploader.destroy("sneak_pad/kve5jti6ns6fqukaw85j")
//     console.log(toDelete)
//     // res.send("Delete Image route reached")
//     res.json(toDelete)
// })
