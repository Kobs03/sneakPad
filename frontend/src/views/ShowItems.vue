<template>
  <div class="container_main">
    <div class="filter">
      <div class="filter_options">
        <div class="header">
          <h3>Filters</h3>
        </div>
        <!---------------------SHOES TYPES------------------------->

        <div class="collapsible">Shoes +</div>

        <div
          class="shoes-type"
          v-for="products in items.products"
          :key="products"
        >
          <div v-if="products.shoes_type != 'null'">
            <input
              type="checkbox"
              id="shoes-type"
              name="shoes_type="
              :value="products.shoes_type"
            />
            {{ products.shoes_type }}
          </div>
        </div>

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

        <div
          class="selections"
          v-for="products in items.products"
          :key="products"
        >
          <div v-if="products.apparel_type != 'null'">
            <input
              type="checkbox"
              id="apparel_type"
              name="apparel_type="
              :value="products.apparel_type"
            />
            {{ products.apparel_type }}
          </div>
        </div>

        <!-------------------PRODUCT_SIZES------------------------>

        <div class="collapsible" @click="sizeFilter">Sizes +</div>

        <div class="size_container" v-for="sizes in sizeDatas" :key="sizes">
          <div class="sizes">
            <input
              type="checkbox"
              id="sizes"
              name="variant_size="
              :value="sizes"
            />
            US {{ sizes }}
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
import { fetchApi, removeDuplicate } from "../controllers/controller";

export default {
  data() {
    return {
      items,
      query: [],
      sizeDatas: [],
      userCategoryData: ["Mens", "Womens", "Kids", "Unisex"],
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

    // FILTER SECTION METHODS

    sizeFilter() {
      console.log("SIZES DATA!");
      for (const test of this.items.products) {
        for (const vars of test.variants) {
          if (vars.variant_size != undefined)
            this.sizeDatas.push(vars.variant_size);
        }
      }

      console.log(this.sizeDatas);

      const filtered = removeDuplicate(this.sizeDatas);
      this.sizeDatas = filtered;
      this.sizeDatas.sort(function (a, b) {
        return a - b;
      });
      console.log("FINAL RES : " + this.sizeDatas);
    },
  },
};
</script>

<style lang="scss">
@import url("../assets/styles/sass/styles.scss");
</style>
