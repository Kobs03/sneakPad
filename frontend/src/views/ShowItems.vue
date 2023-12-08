<template>
  <div class="container_main">
    <div class="filter">
      <div class="filter_options">
        <div class="header">
          <h3>Filters</h3>
        </div>
        <div class="collapsible">Shoes +</div>
        <div class="collapsible">Brands +</div>
        <div class="collapsible">Gender +</div>
        <div class="collapsible">Apparels +</div>
        <div class="collapsible">Sizes +</div>
      </div>
    </div>

    <div class="product_area">
      <div class="header">
        <h1>All Products ({{ items.products.length }} Results)</h1>
      </div>

      <hr />
      <div class="products_container">
        <div class="card" v-for="item in items.products" :key="item">
          <div class="images">
            <img :src="item.product_img[0].img_url" alt="" />
          </div>

          <div>
            <router-link :to="`/products/${item._id}`">
              <h3>{{ item.product_name }}</h3>
            </router-link>
            <h4>{{ item.product_brand }}</h4>
          </div>

          <div>
            <router-link :to="`/products/editProduct/${item._id}`">
              <button>Edit</button>
            </router-link>
            &nbsp;
            <button @click="deleteProduct(item._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
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
      try {
        await axios
          .delete(`http://localhost:8080/products/delProduct/${id}`)
          .then(() => {
            location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("../assets/styles/sass/styles.scss");
</style>
