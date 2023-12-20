const { faker } = require('@faker-js/faker');
const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')

const seedData = [];
const brands = ["Nike", "Addidas", "World Balance", "Converse", "Gucci", "Louie Biton"]
const typeVar = ["Shoes", "Apparels"]
const shoesCategory = ['Athletic Shoes', 'Boots', 'Casual Shoes', 'Dress Shoes', 'Sandals', 'Slippers']
const apparelsCategory = ['T-Shirts', 'Jeans', 'Dresses', 'Hoodies', 'Activewear', 'Formal Wear', 'Swimwear',];
const genderVar = ["Mens", "Womens", "Boys", "Girls", "Unisex"]
const apparelSizes = ["xs", "s", "m", "l", "xl"]

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 100; i++) {
    const product = {
        product_name: faker.commerce.productName(),
        product_brand: brands[Math.floor(Math.random() * brands.length)],
        product_type: typeVar[Math.floor(Math.random() * typeVar.length)],
        product_category: [],
        gender: genderVar[Math.floor(Math.random() * genderVar.length)],
        product_description: faker.lorem.sentences(),
        product_img: [
            {
                img_name: `Image ${i + 1}`,
                img_url: `Image ${i + 1}`,
            },
        ],
        variants: [],
    }

    product.product_category = (product.product_type === "Shoes")
        ? product.product_category = shoesCategory[Math.floor(Math.random() * shoesCategory.length)]
        : product.product_category = apparelsCategory[Math.floor(Math.random() * apparelsCategory.length)]


    const variants = []
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {

        const variant = {
            shoes_sizes: product.product_type === "Shoes" ? getRandomNumber(4, 17) : null,
            apparel_sizes: product.product_type === "Apparels" ? apparelSizes[Math.floor(Math.random() * apparelSizes.length)] : null,
            variant_price: getRandomNumber(599, 15000),
            variant_stocks: getRandomNumber(1, 50),
            products_id_ref: "",
        }
        variants.push(variant)
    }

    seedData.push({ product, variants });
}

const createSeedData = async () => {

    for (let data of seedData) {
        const newProduct = new products_data(data.product)
        // newProduct.save()

        const newVariant = new product_variants(...data.variants)
        newVariant.products_id_ref = newProduct._id

        for (const test of data.variants) {
            const newVariant = new product_variants(test)
            newVariant.products_id_ref = newProduct._id
            newVariant.save()
            newProduct.variants.push(newVariant)

        }

        newProduct.save()

        console.log(newProduct)

    }

}

module.exports = { createSeedData }