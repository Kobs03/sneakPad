<template>
  <h1>Add product listing</h1>

  <form action="/products">
    <label for="name"> Name : </label>
    <input type="text" id="name" v-model="newName" required /> <br />
    <br />

    <label for="brand"> Brand : </label>
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

    <label for="category"> Category : </label>
    <select id="category" v-model="newCategory" required>
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>
    <br />
    <br />

    <label for="user-category"> User-Category : </label>
    <select id="user-category" v-model="newUserCategory" required>
      <option value="none" selected disabled>Choose user-category</option>
      <option value="Mens">Mens</option>
      <option value="Womens">Womens</option>
      <option value="Kids">Kids</option>
      <option value="Unisex">Unisex</option>
    </select>
    <br />
    <br />

    <div v-if="newUserCategory == 'Mens'">
      <hr />
      <label for="sizes"> Sizes : </label> <br /><br />
      <label for="small"> Small : </label>
      <input type="number" id="small" v-model="sizes.small" />
      <br /><br />
      <label for="medium"> Medium : </label>
      <input type="number" id="medium" v-model="sizes.medium" />
      <br /><br />
      <label for="small"> Large : </label>
      <input type="large" id="large" v-model="sizes.large" />
      <hr />
      <br /><br />
    </div>

    <label for="price"> Price : </label>
    <input type="number" id="price" v-model="newPrice" required /> <br />
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
      newPrice: null,
      stocksCount: null,
      sizes: {
        small: null,
        medium: null,
        large: null,
      },
    };
  },

  methods: {
    // add product items on database

    async addItems() {
      try {
        const newProducts = {
          productName: this.newName,
          productBrand: this.newBrand,
          productDescription: this.newDescription,
          productPrice: this.newPrice,
          userCategory: this.newUserCategory,
          productCategory: this.newCategory,
          sizes: {
            small: this.sizes.small,
            medium: this.sizes.medium,
            large: this.sizes.large,
          },
        };

        this.items.products = await axios.post(
          "http://localhost:8080/products/addproducts",
          newProducts
        );

        this.$router.push("/products");
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>