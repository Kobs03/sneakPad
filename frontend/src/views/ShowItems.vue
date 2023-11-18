<template>

  <h1>All Products:</h1>
  <hr />
  <br />
  <div v-for="(item, key) in items.products" :key="key">
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
      <router-link :to="`/products/editProduct/${item._id}`">
        <button>Edit</button>
      </router-link>
      &nbsp;
      <button @click="deleteProduct(item._id)">Delete</button>
    </div>
    <hr />
    <br />
  </div>
</template>

<script>
import axios from "axios";
import { items } from "../modules/items";

export default {
  data() {
    return {
      items,
    };
  },

  methods: {
    async deleteProduct(id) {
      await axios.delete(`http://localhost:8080/products/delete/${id}`);
    },
  },
};
</script>