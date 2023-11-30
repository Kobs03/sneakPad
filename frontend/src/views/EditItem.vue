<template>
  <h1>Edit me sempai!!!</h1>

  <!-- {{ editVariants }} -->

  <form action="/products">
    <label for="name"> Name : </label> <br />
    <input type="text" id="name" v-model="editProduct.product_name" required />
    <br />
    <br />

    <label for="brand"> Brand : </label> <br />
    <input
      type="text"
      id="brand"
      v-model="editProduct.product_brand"
      required
    />
    <br />
    <br />

    <label for="description"> Description : </label> <br />
    <textarea
      type="text"
      id="description"
      row="40"
      col="30"
      v-model="editProduct.product_description"
      required
    >
    </textarea>
    <br />
    <br />

    <label for="category"> Category : </label> <br />
    <select id="category" v-model="editProduct.product_category" required>
      <option value="none" selected disabled>Choose category</option>
      <option value="shoes">Shoes</option>
      <option value="sandals">Sandals</option>
      <option value="apparels">Apparels</option>
    </select>

    <br />
    <br />

    <p>Variants:</p>
    <hr />

    <!-- SPECIFIC PRODUCT ITERATION -->

    <form :action="editProduct._id">
      <button v-if="!toEdit" @click.prevent="toggleEdit">Edit Variants</button>
      &nbsp;
      <button v-if="toEdit" type="submit" @click="toggleEdit">
        Edit Variants
      </button>
      &nbsp;
      <button type="submit" @click.prevent="addVariantsForm">
        Add Variants
      </button>
      <br />
      <br />
      <!-- ADD VARIANTS  -->

      <form :action="editProduct._id">
        <div
          class="variants"
          v-for="(variantDatas, index) in variantsContainer"
          :key="index"
        >
          <input type="hidden" v-model="variantsContainer[index]" />
          <label for="user-category"> User-Category : </label> <br />
          <select
            id="user-category"
            v-model="variantDatas.user_category"
            required
          >
            <option value="none" selected disabled>Choose user-category</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
          <br />

          <label for="size">Size: </label> <br />
          <input type="text" v-model="variantDatas.variant_size" /> <br />

          <label for="price">Price: </label> <br />
          <input type="number" v-model="variantDatas.variant_price" /> <br />

          <label for="stocks">Stocks: </label> <br />
          <input type="number" v-model="variantDatas.number_of_stocks" /> <br />
          <br />

          <button @click.prevent="delVariants(index)">X</button> &nbsp;
        </div>

        <button v-if="variantsContainer.length" @click="addVariantDatas">
          Submit Variants
        </button>
      </form>

      <div
        :action="editProduct._id"
        v-for="(variantDatas, index) in editProduct.variants"
        :key="index"
      >
        <!-- SHOW VARIANTS DATA -->

        <div class="variants" v-if="!toEdit">
          Id : {{ variantDatas._id }} <br />
          Product Id reference: {{ variantDatas.products }} <br />
          User-Category: {{ variantDatas.user_category }} <br />
          Size: {{ variantDatas.variant_size }} <br />
          Price: ${{ variantDatas.variant_price }} <br />
          Stocks: {{ variantDatas.number_of_stocks }} <br />
          <br />
        </div>

        <!-- EDIT VARIANTS -->

        <div class="variants" v-if="toEdit">
          <label for="user-category"> User-Category : </label> <br />
          <select
            id="user-category"
            v-model="variantDatas.user_category"
            required
          >
            <option value="none" selected disabled>Choose user-category</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
          <br />

          <label for="size">Size: </label> <br />
          <input type="text" id="size" v-model="variantDatas.variant_size" />
          <br />

          <label for="price">Price: </label> <br />
          <input
            type="number"
            id="price"
            v-model="variantDatas.variant_price"
          />
          <br />

          <label for="stocks">Stocks: </label> <br />
          <input
            type="number"
            id="stocks"
            v-model="variantDatas.number_of_stocks"
          />
          <br />
          <br />

          <button @click.prevent="editVariant(variantDatas._id, index)">
            Save
          </button>
          &nbsp;
          <button @click="deleteVariant(variantDatas._id)">Delete</button>
        </div>
      </div>
    </form>

    <br />

    <button type="submit" @click="editItem">Submit</button>
  </form>
</template>

<script>
import { items } from "../modules/items";
import axios from "axios";

export default {
  data() {
    return {
      items,
      toEdit: false,
      editProduct: [],
      variantsContainer: [],
      productId: this.$route.params.id,
    };
  },

  methods: {
    // Fetch specific data via Id params

    async toEditData() {
      try {
        this.editProduct = await axios.get(
          `http://localhost:8080/products/${this.productId}`
        );
        this.editProduct = this.editProduct.data;
      } catch (error) {
        console.log(error);
      }
    },

    // Edit product via specific data

    async editItem() {
      try {
        this.items = await axios.put(
          `http://localhost:8080/products/editProduct/${this.productId}`,
          {
            product_name: this.editProduct.product_name,
            product_brand: this.editProduct.product_brand,
            product_description: this.editProduct.product_description,
            product_category: this.editProduct.product_category,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    // Add Variant

    async addVariantDatas() {
      try {
        await axios.post(
          `http://localhost:8080/products/addVariants/${this.productId}`,
          {
            variantData: this.variantsContainer,
          }
        );
        console.log("addVariant clicked");
      } catch (error) {
        console.log(error);
      }
    },

    // Edit Variant

    async editVariant(variantId, index) {
      try {
        this.items.products.variants = await axios.put(
          `http://localhost:8080/products/editVariant/${variantId}`,
          {
            user_category: this.editProduct.variants[index].user_category,
            variant_size: this.editProduct.variants[index].variant_size,
            variant_price: this.editProduct.variants[index].variant_price,
            number_of_stocks: this.editProduct.variants[index].number_of_stocks,
          }
        );

        alert("Saved!");
      } catch (error) {
        console.log(error);
      }
    },

    // Delete Variant

    async deleteVariant(variantId) {
      try {
        await axios.delete(
          `http://localhost:8080/products/delVariant/${variantId}`
        );

        alert("Deleted!");
      } catch (error) {
        console.log(error);
      }
    },

    toggleEdit() {
      this.toEdit = !this.toEdit;
    },

    addVariantsForm() {
      this.variantsContainer.push({});
    },

    delVariants(index) {
      this.variantsContainer.splice(index, 1);
    },
  },

  mounted() {
    this.toEditData();
  },
};
</script>

<style>
.variants {
  width: 200px;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
</style>