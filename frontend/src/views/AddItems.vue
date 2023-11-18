<template>
  
  <h1>Add product listing</h1>
  <form>
    <label for="name"> Name : </label>
    <input type="text" v-model="newName" /> <br />
    <br />

    <label for="brand"> Brand : </label>
    <input type="text" v-model="newBrand" /> <br />
    <br />

    <label for="description"> Description : </label> <br />
    <textarea type="text" row="40" col="30" v-model="newDescription">
    </textarea>
    <br />
    <br />

    <label for="category"> Category : </label>
    <select id="category" v-model="newCategory">
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>
    <br />
    <br />

    <label for="price"> Price : </label>
    <input type="number" v-model="newPrice" /> <br />
    <br />

    <label for="stocks"> In Stock : </label>
    <input type="checkbox" v-model="inStock" /> <br />
    <br />

    <button @click="addItems">Submit</button>
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
      newPrice: 0,
      inStock: false,
    };
  },

  methods: {
    // add product items on database

    async addItems() {
      this.items = await axios.post(
        "http://localhost:8080/products/addproducts",
        {
          productName: this.newName,
          productBrand: this.newBrand,
          productDescription: this.newDescription,
          productCategory: this.newCategory,
          productPrice: this.newPrice,
          productStocks: this.inStock,
        }
      );
    },
  },
};
</script>