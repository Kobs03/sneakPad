<template>
  <h1>Product Details</h1>
  <hr />
  <br />

  Product Id: {{ itemDetails._id }} <br />
  Name:<router-link :to="`/products/${itemDetails._id}`">{{
    itemDetails.productName
  }}</router-link>
  <br />
  Brand: {{ itemDetails.productBrand }} <br />
  Description: {{ itemDetails.productDescription }} <br />
  Category: {{ itemDetails.productCategory }} <br />
  Price: {{ itemDetails.productPrice }} <br />
  In Stock: {{ itemDetails.productStocks }} <br />
  <br />

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      itemDetails: [],
      productId: this.$route.params.id,
    };
  },

  methods: {
    async showItemDetail() {
      try {
        const singleItem = await axios.get(
          `http://localhost:8080/products/` + this.productId
        );
        this.itemDetails = singleItem.data;
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.showItemDetail();
  },
};
</script>