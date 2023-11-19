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

    <label for="price"> Price : </label>
    <input type="number" id="price" v-model="newPrice" required /> <br />
    <br />

    <label for="stocks"> Stock : </label>
    <input type="number" id="stocks" v-model="stocksCount" required /> <br />
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
      newPrice: null,
      stocksCount: null,
    };
  },

  methods: {
    // add product items on database

    async addItems() {
      try {
        this.items.products = await axios.post(
          "http://localhost:8080/products/addproducts",
          {
            productName: this.newName,
            productBrand: this.newBrand,
            productDescription: this.newDescription,
            productCategory: this.newCategory,
            productPrice: this.newPrice,
            productStocks: this.stocksCount,
          }
        );
        this.$router.push("/products");
        this.$router.go();
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>