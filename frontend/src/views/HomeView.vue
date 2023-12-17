<template>
  <h1>Welcome to Sneak Pad !!</h1>
  TOTAL RES: {{ items.products.length }} <br>
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
    async filterData() {
      const items = await axios.get(
        "http://localhost:8080/products/var?variant_size=12&variant_size=8"
      );
      this.items.variants = items.data;
      this.items.products = this.items.variants;
    },
  },
};
</script>
