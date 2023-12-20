<template>
  <div class="main_container">
    <div class="side1">
      <div class="image1" v-for="img in itemDetails.product_img" :key="img">
        <img src="../assets/images/hanichu.jpg" alt="" />
      </div>

      <div class="description">
        Description:
        <p>
          {{ itemDetails.product_description }}
        </p>
      </div>
    </div>

    <div class="side2">
      <div class="item_details">
        <div class="base">
          <h1>{{ itemDetails.product_name }}</h1>
          Brand: {{ itemDetails.product_brand }} <br /><br />
          Price : <span v-if="variantPrice">₱ </span>{{ variantPrice
          }}<br /><br />
          In Stock: {{ variantStocks }} <br /><br />
          Available sizes:
          <hr />

          <div class="variants">
            <button
              class="sizeButtons"
              v-for="vars in itemDetails.variants"
              :key="vars"
            >
              <div @click="showPrice(vars.variant_price, vars.variant_stocks)">
                <div v-if="itemDetails.product_type == 'Shoes' && !null">
                  US {{ vars.shoes_sizes }}
                </div>

                <div v-if="itemDetails.product_type == 'Apparels' && !null">
                  {{ vars.apparel_sizes }}
                </div>
              </div>
            </button>
          </div>
          <hr />
        </div>
        <div class="order">
          <div class="buttons">
            <button>Buy now</button>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      itemDetails: [],
      productId: this.$route.params.id,
      variantPrice: "",
      variantStocks: "",
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

    // Button functions

    showPrice(price, stocks) {
      this.variantPrice = price;
      this.variantStocks = stocks;
    },
  },

  mounted() {
    this.showItemDetail();
  },
};
</script>