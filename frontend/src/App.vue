<template>
  <div class="topnav">
    <div class="logo">
      <router-link to="/"> <h1>Sneak Pad</h1></router-link>
    </div>

    <div class="menus">
      <router-link to="/products">Products</router-link>
      <router-link to="/products/addProducts">Add products</router-link>
      <input type="text" placeholder="Search.." />
      <router-link to="">Cart</router-link>
    </div>
  </div>

  <RouterView />
</template>

<script>
import { items } from "./modules/items";
import { fetchApi } from "./controllers/controller";

export default {
  data() {
    return {
      items,
      productItems: [],
    };
  },

  methods: {
    async getAllProducts() {
      try {
        fetchApi(
          "get",
          "http://localhost:8080/products",
          null,
          (res) => (this.items.products = res.data)
        );
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

<style scoped>
.topnav {
  width: auto;
  height: 100px;
  display: flex;
  background: peachpuff;
}

.logo {
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.menus {
  width: 20%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>