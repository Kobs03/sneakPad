<template>
  <h1>Welcome to Sneak Pad !!</h1>
  Query Array : {{ query }} <br />
  <br />
  Query String : {{ queryString }} <br />

  <br />

  <div v-for="items in items.products" :key="items">
    <div><input type="checkbox" />{{ items.product_brand }}</div>
  </div>

  <br />

  Filter result: {{ items.products }}

  <br />
  <br />

  <button @click.prevent="filterData">filter</button>
</template>

<script>
import axios from "axios";
import { items } from "../modules/items";

export default {
  data() {
    return {
      items,
      query: [],
      queryString: "",
    };
  },

  methods: {
    test() {
      this.queryString = this.query[0];

      for (let i = 1; i < this.query.length; i++) {
        this.queryString += `&${this.query[i]}`;
      }

      return (this.axiosPost += this.queryString);
    },

    async filterData() {
      const items = await axios.get("http://localhost:8080/products?");
      this.items.variants = items.data;
      this.items.products = this.items.variants;
    },
  },

  mounted() {
    this.test();
  },
};
</script>
