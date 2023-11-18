<template>
  <h1>Edit me sempai!!!</h1>

  <form>
    <label for="name"> Name : </label>
    <input
      type="text"
      placeholder="putangina"
      v-model="editProduct.productName"
    />
    <br />
    <br />

    <label for="brand"> Brand : </label>
    <input type="text" v-model="editProduct.productBrand" /> <br />
    <br />

    <label for="description"> Description : </label> <br />
    <textarea
      type="text"
      row="40"
      col="30"
      v-model="editProduct.productDescription"
    >
    </textarea>
    <br />
    <br />

    <label for="category"> Category : </label>
    <select id="category" v-model="editProduct.productCategory">
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>
    <br />
    <br />

    <label for="price"> Price : </label>
    <input type="number" v-model="editProduct.productPrice" /> <br />
    <br />

    <label for="stocks"> In Stock : </label>
    <input type="checkbox" v-model="editProduct.productStocks" /> <br />
    <br />

    <button @click.prevent="editItem">Edit</button>
  </form>
</template>

<script>
import { items } from "../modules/items";
import axios from "axios";

export default {
  data() {
    return {
      items,
      editProduct: [],
      productId: this.$route.params.id,
    };
  },

  methods: {

    toEditData() {
      this.editProduct = this.items.products.find(
        (data) => data._id === this.productId
      );
    },

     editItem() {
      this.items =  axios.put(
        `http://localhost:8080/products/editProducts/${this.productId}`,
        {
          productName: this.editProduct.productName,
          productBrand: this.editProduct.productBrand,
          productDescription: this.editProduct.productDescription,
          productCategory: this.editProduct.productCategory,
          productPrice: this.editProduct.productPrice,
          productStocks: this.editProduct.productStocks,
        }
      )
      this.$router.push('/products')
    },
  },

  mounted() {
    this.toEditData();
  },
};
</script>