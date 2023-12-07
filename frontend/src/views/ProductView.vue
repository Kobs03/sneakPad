<template>
  <div class="main_container">
    <div class="side1">
      <div class="image1" v-for="img in itemDetails.product_img" :key="img">
        <img :src="img.img_url" alt="" />
      </div>

      <div class="description">
        Description:
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          sequi distinctio, sit nisi sunt asperiores excepturi sapiente,
          repellendus fugit beatae vero. Accusantium incidunt, quis fugiat totam
          aperiam libero maxime quo.
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
              <div
                @click="showPrice(vars.variant_price, vars.number_of_stocks)"
              >
                {{ vars.variant_size }}
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