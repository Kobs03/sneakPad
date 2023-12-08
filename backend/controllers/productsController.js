const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')
const { uploadFromBuffer, deleteUpload } = require('../cloudinary')


const productController = {

    getProducts() {
        return async (req, res) => {

            const allProducts = await products_data.find()
                .populate('variants')

            res.json(allProducts)

        }
    },

    getVariants() {
        return async (req, res) => {

            const allVariants = await product_variants.find()

            res.json(allVariants)

        }
    },

    findProduct() {
        return async (req, res) => {

            const id = req.params.id

            const productData = await products_data.findById({ _id: id }
            ).populate('variants')

            res.json(productData)

        }
    },

    addProducts() {
        return async (req, res) => {

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

        }

    },

    addVariants() {
        return async (req, res) => {

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

        }
    },

    editProduct() {
        return async (req, res) => {

            const id = req.params.id

            const updateProduct = await products_data.findOneAndUpdate(
                { _id: id },
                { $set: req.body }
            )

            res.json(updateProduct)

            console.log("EDIT PRODUCT SUCCESSFUL")

        }
    },

    editVariant() {
        return async (req, res) => {

            const id = req.params.id

            const updateVariant = await product_variants.findOneAndUpdate(
                { _id: id },
                { $set: req.body }
            )

            res.json(updateVariant)

            console.log("Edited successfully")

        }
    },

    deleteProduct() {
        return async (req, res) => {

            const id = req.params.id

            const products = await products_data.findById({ _id: id })

            for (images of products.product_img) {
                deleteUpload(images.img_name)
            }

            const delProduct = await products_data.findByIdAndDelete({ _id: id })
            await product_variants.deleteMany({ _id: delProduct.variants })

            console.log("Deleted Product: " + delProduct)
            res.json(delProduct)

        }
    },

    deleteVariant() {
        return async (req, res) => {

            const id = req.params.id

            const delVariant = await product_variants.findOneAndDelete({ _id: id })
            res.json(delVariant)

            console.log("Deleted Variant " + delVariant)

        }
    },
}

module.exports = productController