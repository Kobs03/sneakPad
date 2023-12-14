const { faker } = require('@faker-js/faker');
const { products_data } = require('../models/productModel')
const { product_variants } = require('../models/variantModel')

const seedData = [];
const brands = ["Nike", "Addidas", "World Balance", "Converse", "Gucci", "Louie Biton"]
const shoesVar = ["Sneaker", "Running", "Casual"]
const category = ["Shoes", "Apparels", "Others"]
const apparelVar = ["T-shirt", "Hoodie", "Pants"]
const userCat = ["Mens", "Womens", "Kids", "Unisex"]

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

for (let i = 0; i < 100; i++) {
    const product = {
        product_name: faker.commerce.productName(),
        product_brand: brands[Math.floor(Math.random() * brands.length)],
        product_description: faker.lorem.sentences(),
        product_category: category[Math.floor(Math.random() * category.length)],
        shoes_type: shoesVar[Math.floor(Math.random() * shoesVar.length)],
        apparel_type: apparelVar[Math.floor(Math.random() * apparelVar.length)],
        product_img: [
            {
                img_name: `Image ${i + 1}`,
                img_url: `Image ${i + 1}`,
            },
        ],
        variants: [],

    }

    const variants = [
        {
            user_category: userCat[Math.floor(Math.random() * userCat.length)],
            variant_size: getRandomNumber(4,17),
            variant_price: getRandomNumber(599,15000),
            number_of_stocks: getRandomNumber(1,100),
            products: "",
        }
    ]

    seedData.push({ product, variants });
}

const createSeedData = async () => {

    for (let data of seedData) {
        const newProduct = new products_data(data.product)
        // newProduct.save()

        const newVariant = new product_variants(...data.variants)
        newVariant.products = newProduct._id
        newVariant.save()

        newProduct.variants.push(newVariant)
        newProduct.save()

    }

}

module.exports = { createSeedData }