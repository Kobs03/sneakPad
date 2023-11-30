<template>
  <h1>Product Details</h1>
  <hr />
  <br />

  Product Id: {{ itemDetails._id }} <br />
  Product Id: {{ itemDetails._id }} <br />
  Name:{{ itemDetails.product_name }}
  <br />
  Brand: {{ itemDetails.product_brand }} <br />
  Description: {{ itemDetails.product_description }} <br />
  Category: {{ itemDetails.product_category }} <br />
  variants: <br />

  <div class="variants" v-for="variant in itemDetails.variants" :key="variant">
    Id : {{ variant._id }} <br />
    Product Id reference: {{ variant.products }} <br />
    User-Category: {{ variant.user_category }} <br />
    Size: {{ variant.variant_size }} <br />
    Price: ${{ variant.variant_price }} <br />
    Stocks: {{ variant.number_of_stocks }} <br />
    <br />
  </div>
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