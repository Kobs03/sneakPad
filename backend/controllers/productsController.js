const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')
const { uploadFromBuffer, deleteUpload } = require('../cloudinary')


const productController = {


    // ------------ CODE TEST ------------

    codeTesting() {
        return async (req, res) => {

            // if (req.body) {
            //     for (key in req.body) {

            //         if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            //             const value = req.body[key]
            //             const lowercaseValue = value.toLowerCase()
            //             req.body[key] = lowercaseValue;
            //         }

            //     }
            //     console.log(req.body)
            //     res.json(req.body)
            // }

            res.json(req.body)
        }
    },


    // ------------ GET ROUTES ------------

    getProducts() {
        return async (req, res, next) => {

            const allProducts = await products_data.find()
                .populate('variants')

            res.json(allProducts)

        }
    },

    getVariants() {
        return async (req, res) => {

            req.query

            const allVariants = await product_variants.find(req.query)
                .populate('products')

            let productIds = []

            for (results of allVariants) {
                productIds.push(results._id)
            }

            const finalRes = await products_data.find({
                variants: { $in: productIds }
            }).populate("variants")

            console.log(productIds)
            console.log(finalRes)

            res.json(finalRes)

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

    filterOptions() {
        return async (req, res) => {

            const filterOptions = {
                brands: [],
                shoesType: [],
                apparelType: [],
                userCategory: [],
                sizes: [],
            }

            const brandsRes = await products_data.distinct("product_brand")
            const shoesTypeRes = await products_data.distinct("shoes_type")
            const apparelRes = await products_data.distinct("apparel_type")
            const genderRes = await product_variants.distinct("user_category")
            const sizesRes = await product_variants.distinct("variant_size")


            filterOptions.brands.push(...brandsRes)
            filterOptions.shoesType.push(...shoesTypeRes)
            filterOptions.apparelType.push(...apparelRes)
            filterOptions.userCategory.push(...genderRes)
            filterOptions.sizes.sort((a, b) => { return a - b }).push(...sizesRes)

            res.json(filterOptions)

            // filter test

            // const sizeOrder = { "XS": 0, "S": 1, "M": 2, "L": 3, "XL": 4 };

            // const testData = await products_data.findById("insert id here").populate("variants")
            // const toSort = []

            // for (const data of testData.variants) {
            //     toSort.push(data)
            // }

            // if (testData.apparel_type != null) {
            //     toSort.sort(function (a, b) {
            //         return sizeOrder[a.apparel_size] - sizeOrder[b.apparel_size]
            //     })
            //     console.log("SORTED SUCCESSFULLY")
            // } else {
            //     console.log("NOTHING TO SORT!")
            // }

            // res.json(toSort)

        }
    },

    // ------------ POST ROUTES ------------


    addProducts() {
        return async (req, res) => {

            // create new products and save

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

            // IMAGE UPLOAD !!!

            if (findProduct) {
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

                findProduct.product_img.push(...imgData)
            }


            // create new variant and store the req.body in test arr, 

            const variantsArray = JSON.parse(req.body.variantData)

            // Iterate the objects in the array then save and push

            for (const object of variantsArray) {

                object.products = newProduct._id

                const newVariant = await product_variants(
                    object
                )

                await newVariant.save()
                findProduct.variants.push(newVariant)
            }

            // save the updated new product

            await findProduct.save()

            console.log("Products Successfully added! " + findProduct)

            res.redirect("/products")

        }

    },

    addVariants() {
        return async (req, res) => {

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

        }
    },

    // -------------------------------------


    // ------------ PUT ROUTES ------------

    editProduct() {
        return async (req, res) => {

            const id = req.params.id

            const updateProduct = await products_data.findOneAndUpdate(
                { _id: id },
                { $set: req.body }
            )

            console.log("EDIT PRODUCT SUCCESSFUL")

            res.json(updateProduct)

        }
    },

    editVariant() {
        return async (req, res) => {

            const id = req.params.id

            const updateVariant = await product_variants.findOneAndUpdate(
                { _id: id },
                { $set: req.body }
            )

            console.log("Edited successfully")

            res.json(updateVariant)

        }
    },

    // -------------------------------------


    // ------------ DELETE ROUTES ------------

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

            console.log("Deleted Variant " + delVariant)

            res.json(delVariant)

        }
    },

    // -------------------------------------

}

module.exports = productController