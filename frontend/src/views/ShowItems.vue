<template>
  <h1>All Products:</h1>
  <hr />
  <br />
  <div v-for="(item, key) in items" :key="key">
    <div class="card">
      Product Id: {{ item._id }} <br />
      Name:<router-link :to="`/products/${item._id}`">{{
        item.productName
      }}</router-link>
      <br />
      Brand: {{ item.productBrand }} <br />
      Description: {{ item.productDescription }} <br />
      Category: {{ item.productCategory }} <br />
      Price: {{ item.productPrice }} <br />
      In Stock: {{ item.productStocks }} <br />
      <br />
      <button>Edit</button> &nbsp;
      <button>Delete</button>
    </div>
    <hr />
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items:[]
    };
  },

  methods: {

    async getAllProducts() {
      //using axios
      try {
        const items = await axios.get("http://localhost:8080/products");
        this.items = items.data;
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