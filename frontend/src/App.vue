<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/products">Products</router-link> |
    <router-link to="/products/addProducts">Add products</router-link> |
  </nav>

  <RouterView :items="items" :addItems="addItems" :newName ="newName"/>

  <!-- :newBrand="newBrand" :newDescription="newDescription"
  :newCategory="newCategory" :newPrice="newPrice" :newStocks="newStocks" -->

  <AddListingView v-model="newName" />
</template>

<script>
//parent component

import AddListingView from "./views/AddListingView.vue";
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      newName: "",
      newBrand: "",
      newDescription: "",
      newCategory: "",
      newPrice: 0,
      newStocks: false,
    };
  },

  components: {
    AddListingView,
  },

  methods: {
    // fetch data from the express server
    async getAllProducts() {
      //using axios
      try {
        const items = await axios.get("http://localhost:8080/products");
        this.items = items.data;
      } catch (error) {
        console.log(error);
      }
    },

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
          productStocks: this.newStocks,
        }
      );
    },
  },

  mounted() {
    this.getAllProducts();
  },
};
</script>