<template>
  <h1>All Products:</h1>
  <hr />
  <br />
  <div v-for="(item, key) in items.products" :key="key">
    <div class="card">
      Product Id: {{ item._id }} <br />
      Name:<router-link :to="`/products/${item._id}`">{{
        item.product_name
      }}</router-link>
      <br />
      Brand: {{ item.product_brand }} <br />
      Description: {{ item.product_description }} <br />
      Category: {{ item.product_category }} <br />
      User-Category: {{ item.user_category }} <br />
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
    deleteProduct(id) {
      try {
        axios.delete(`http://localhost:8080/products/delete/${id}`);
        this.$router.push("/products").then(() => {
          this.$router.go();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>