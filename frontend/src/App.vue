<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/products">Products</router-link> |
    <router-link to="/products/addProducts">Add products</router-link> |
  </nav>

  <RouterView />
</template>

<script>
import { items } from "./modules/items";
import axios from "axios"

export default {
  data() {
    return {
      items,
      productItems:[],
    };
  },

  methods: {
    async getAllProducts() {
      //using axios
      try {
        const items = await axios.get("http://localhost:8080/products");
        this.items.products = items.data;
        this.productItems = this.items.products;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getAllProducts();
  },

};
</script>