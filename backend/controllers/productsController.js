const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')
const { uploadFromBuffer, deleteUpload } = require('../cloudinary')

const getDistinctValues = async (model, field) => {
    try {
        return await model.distinct(field);
    } catch (error) {
        console.error(`Error fetching distinct values for ${field}: ${error.message}`);
        throw error;
    }
};

const productController = {

    getProducts() {
        return async (req, res, next) => {

            const { product_type, product_brand, product_category, gender, shoes_sizes, apparel_sizes } = req.query

            const filter = {}
            const refIds = {
            }

            if (product_type) {
                filter.product_type = product_type
            }

            if (product_brand) {
                filter.product_brand = product_brand
            }

            if (product_category) {
                filter.product_category = product_category
            }

            if (gender) {
                filter.gender = gender
            }

            if (shoes_sizes) {
                [shoes_sizes].map(res => { return res })
            }

            if (apparel_sizes) {
                [apparel_sizes].map(res => { return res })
            }

            const variantResults = await product_variants.find({
                $and: [
                    { shoes_sizes: { $in: shoes_sizes } },
                    { apparel_sizes: { $in: apparel_sizes } }
                ]
            })
                .populate('products')
                .distinct('products_id_ref')

            if (shoes_sizes || apparel_sizes) {
                filter._id = variantResults
            }

            const allProducts = await products_data.find(filter).populate('variants');

            console.log(filter)
            console.log(variantResults)
            console.log("TOTAL RESULTS : " + variantResults.length)
            res.json(allProducts)

        }
    },

    getVariants() {
        return async (req, res) => {

            if (req.query.variant_size) {
                {
                    const queryRes = await products_data.find(req.query)
                        .populate('variants')

                    const allVariants = await product_variants.find(req.query)
                        .populate('products')

                    let productIds = []

                    for (results of allVariants) {
                        productIds.push(results._id)
                    }

                    const initialRes = await products_data.find({
                        variants: { $in: productIds }
                    }).populate("variants")

                    console.log(initialRes.length)

                    queryRes.push(...initialRes)

                    console.log(queryRes.length)

                    res.json(queryRes)
                }
            }
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
                types: await getDistinctValues(products_data, "product_type"),
                brands: await getDistinctValues(products_data, "product_brand"),
                category: await getDistinctValues(products_data, "product_category"),
                gender: await getDistinctValues(products_data, "gender"),
                shoesSizes: [...await getDistinctValues(product_variants, "shoes_sizes")]
                    .sort((a, b) => { return a - b }),
                apparelSizes: [... await getDistinctValues(product_variants, "apparel_sizes")]
            }

            res.json(filterOptions)
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

                if (findProduct.product_type === "shoes") {
                    object.apparel_sizes = null
                } else {
                    object.shoes_sizes = null
                }

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

            // -------------------FILTER TEST LEGACY CODE---------------------------

            // const { variant_size, user_category, ...rest } = req.query

            // let varData = {
            //     variant_size: variant_size
            // }

            // const varRes = await product_variants.find(varData)

            // let varIdRef = []

            // for (results of varRes) {
            //     varIdRef.push(results._id)
            // }

            // if (!varIdRef.length) {
            //     const varResUpdated = await products_data.find(
            //         rest
            //     ).populate("variants")
            //     res.json(varResUpdated)
            // } else {
            //     const res2 = await products_data.find({
            //         $and: [rest, { variants: { $in: varIdRef } },
            //         ]
            //     }
            //     ).populate("variants")
            //     console.log(res2)
            //     res.json(res2)
            // }
        }
    },

}

module.exports = productController