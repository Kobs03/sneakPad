<template>
  <div class="container_main">
    <div class="filter">
      <div class="filter_options">
        <div class="header">
          <h3>Filters</h3>
        </div>
        <!---------------------SHOES TYPES------------------------->

        <div class="collapsible">Shoes +</div>

        <!-------------------PRODUCT_BRANDS------------------------>

        <div class="collapsible">Brands +</div>

        <div
          class="selections"
          v-for="products in items.products"
          :key="products"
        >
          <input
            type="checkbox"
            id="brands"
            name="product_brand="
            :value="products.product_brand"
          />
          {{ products.product_brand }}
        </div>

        <!-------------------PRODUCT_BRANDS------------------------>

        <div class="collapsible">Gender +</div>

        <div v-for="userCategory in userCategoryData" :key="userCategory">
          <input
            type="checkbox"
            id="user_category"
            name="user_category="
            :value="userCategory"
          />
          {{ userCategory }}
        </div>

        <!-------------------APPAREL_TYPES------------------------>

        <div class="collapsible">Apparels +</div>

        <!-------------------PRODUCT_SIZES------------------------>

        <div class="collapsible">Sizes +</div>

        <div v-for="products in items.products" :key="products">
          <div
            class="size_container"
            v-for="sizes in products.variants"
            :key="sizes"
          >
            <div class="sizes">
              <input
                type="checkbox"
                id="sizes"
                name="variant_size="
                :value="sizes.variant_size"
              />

              {{ sizes.variant_size }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product_area">
      <div class="header">
        <!-- <h1>All Products ({{ items.products.length }} Results)</h1> -->
      </div>

      <hr />
      <div class="products_container">
        <div class="card" v-for="item in items.products" :key="item">
          <div class="images" v-if="item.product_img.length">
            <img :src="item.product_img[0].img_url" alt="product image" />
          </div>

          <div class="images" v-else>
            <img
              src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
              alt="no image"
            />
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
import { items } from "../modules/items";
import { fetchApi } from "../controllers/controller";

export default {
  data() {
    return {
      items,
      userCategoryData: ["Mens", "Womens", "Kids", "Unisex"],
      sizeDatas: [],
      sizesDatas: [],
      query: [],
    };
  },

  methods: {
    deleteProduct(id) {
      fetchApi(
        "delete",
        `http://localhost:8080/products/delProduct/${id}`,
        null,
        () => location.reload()
      );
    },
  },
};
</script>

<style lang="scss">
@import url("../assets/styles/sass/styles.scss");
</style>
