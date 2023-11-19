<template>
  <h1>Edit me sempai!!!</h1>
  <form action="/products">
    <label for="name"> Name : </label>
    <input type="text" id="name" v-model="editProduct.productName" required />
    <br />
    <br />

    <label for="brand"> Brand : </label>
    <input type="text" id="brand" required v-model="editProduct.productBrand" />
    <br />
    <br />

    <label for="description"> Description : </label> <br />
    <textarea
      type="text"
      required
      row="40"
      col="30"
      v-model="editProduct.productDescription"
    >
    </textarea>
    <br />
    <br />

    <label for="category"> Category : </label>
    <select id="category" required v-model="editProduct.productCategory">
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>
    <br />
    <br />

    <label for="price"> Price : </label>
    <input
      type="number"
      id="price"
      required
      v-model="editProduct.productPrice"
    />
    <br />
    <br />

    <label for="stocks"> Stock : </label>
    <input
      type="number"
      id="stocks"
      required
      v-model="editProduct.productStocks"
    />
    <br />
    <br />

    <button type="button" @click="editItem">Edit</button>
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
      try {
        this.items = axios.put(
          `http://localhost:8080/products/editProducts/${this.productId}`,
          {
            productName: this.editProduct.productName,
            productBrand: this.editProduct.productBrand,
            productDescription: this.editProduct.productDescription,
            productCategory: this.editProduct.productCategory,
            productPrice: this.editProduct.productPrice,
            productStocks: this.editProduct.productStocks,
          }
        );
        this.$router.push("/products");
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.toEditData();
  },
};
</script>