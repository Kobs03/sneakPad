<template>
  <h1>Add product listing</h1>
  <form action="/products">
    <label for="name"> Name : </label> <br />
    <input type="text" id="name" v-model="newName" required /> <br />
    <br />

    <label for="brand"> Brand : </label> <br />
    <input type="text" id="brand" v-model="newBrand" required /> <br />
    <br />

    <label for="description"> Description : </label> <br />
    <textarea
      type="text"
      id="description"
      row="40"
      col="30"
      v-model="newDescription"
      required
    >
    </textarea>
    <br />
    <br />

    <label for="category"> Category : </label> <br />
    <select id="category" v-model="newCategory" required>
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>
    <br />
    <br />

    <button @click.prevent="addVariants" v-if="!variantsContainer.length">
      Add Variants
    </button>
    <br />

    <div
      class="variants"
      v-for="(variantDatas, index) in variantsContainer"
      :key="index"
    >
      <label for="user-category"> User-Category : </label> <br />
      <select id="user-category" v-model="variantDatas.user_category" required>
        <option value="none" selected disabled>Choose user-category</option>
        <option value="Mens">Mens</option>
        <option value="Womens">Womens</option>
        <option value="Kids">Kids</option>
        <option value="Unisex">Unisex</option>
      </select>
      <br />

      <input type="hidden" v-model="variantsContainer[index]" />

      <label for="size">Size: </label> <br />
      <input type="text" v-model="variantDatas.variant_size" /> <br />

      <label for="price">Price: </label> <br />
      <input type="number" v-model="variantDatas.variant_price" /> <br />

      <label for="stocks">Stocks: </label> <br />
      <input type="number" v-model="variantDatas.number_of_stocks" /> <br />
      <br />

      <button @click.prevent="addVariants">+</button> &nbsp;
      <button @click.prevent="delVariants(index)">X</button>
    </div>

    <br />

    <button type="submit" @click="addItems">Submit</button>
  </form>

</template>

<script>
import axios from "axios";
import { items } from "../modules/items";

export default {
  data() {
    return {
      items,
      newName: "",
      newBrand: "",
      newDescription: "",
      newCategory: "",
      newUserCategory: "",
      variantsContainer: [],
    };
  },

  methods: {
    // add product items on database

    async addItems() {
      try {
        this.items.products = await axios.post(
          "http://localhost:8080/products/addProducts",
          {
            product_name: this.newName,
            product_brand: this.newBrand,
            product_description: this.newDescription,
            user_category: this.newUserCategory,
            product_category: this.newCategory,
            variantData: this.variantsContainer,
          }
        );

        this.$router.push("/products");
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },

    addVariants() {
      this.variantsContainer.push({});
    },

    delVariants(index) {
      this.variantsContainer.splice(index, 1);
    },
  },
};
</script>

