<template>
  <div class="container_main">
    <div class="filter">
      <div class="filter_options">
        <div class="header">
          <h3>Filters</h3>
          <button @click.prevent="getFilterResponse">TEST</button>
        </div>
        {{ filterArray }}
        <!---------------------SHOES TYPES------------------------->

        <div class="collapsible">Shoes +</div>

        <div class="shoes-type" v-for="res of filterDatas.shoesType" :key="res">
          <div v-if="res != 'null'">
            <input
              type="checkbox"
              id="shoes-type"
              :value="`shoes_type=${res}`"
              v-model="filterArray"
              @change="getFilterResponse"
            />
            {{ res }}
          </div>
        </div>

        <!-------------------PRODUCT_BRANDS------------------------>

        <div class="collapsible">Brands +</div>

        <div class="selections" v-for="res in filterDatas.brands" :key="res">
          <input
            type="checkbox"
            id="brands"
            :value="`product_brand=${res}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ res }}
        </div>

        <!-------------------PRODUCT_BRANDS------------------------>

        <div class="collapsible">User Category +</div>

        <div
          v-for="userCategory in filterDatas.userCategory"
          :key="userCategory"
        >
          <input
            type="checkbox"
            id="user_category"
            :value="`user_category=${userCategory}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ userCategory }}
        </div>

        <!-------------------APPAREL_TYPES------------------------>

        <div class="collapsible">Apparels +</div>

        <div
          class="selections"
          v-for="res in filterDatas.apparelType"
          :key="res"
        >
          <div v-if="res != 'null'">
            <input
              type="checkbox"
              id="apparel_type"
              :value="`apparel_type=${res}`"
              v-model="filterArray"
              @change="getFilterResponse"
            />
            {{ res }}
          </div>
        </div>

        <!-------------------PRODUCT_SIZES------------------------>

        <div class="collapsible">Sizes +</div>

        <div
          class="size_container"
          v-for="sizes in filterDatas.sizes"
          :key="sizes"
        >
          <div class="sizes">
            <input
              type="checkbox"
              id="sizes"
              :value="`variant_size=${sizes}`"
              v-model="filterArray"
              @change="getFilterResponse"
            />
            US {{ sizes }}
          </div>
        </div>
      </div>
    </div>

    <div class="product_area">
      <div class="header">
        <h1>All Products ({{ items.products.length }} Results)</h1>
      </div>

      <hr />
      <div class="products_container">
        <div class="card" v-for="item in items.products" :key="item">
          <div class="images" v-if="item.product_img.length">
            <img src="../assets/images/hanichu.jpg" alt="product image" />
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
      filterArray: [],
      filterDatas: [],
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

    getFilterOptions() {
      fetchApi(
        "get",
        "http://localhost:8080/products/filteroptions",
        null,
        (res) => (this.filterDatas = res.data)
      );
    },

    getFilterResponse() {
      fetchApi(
        "get",
        "http://localhost:8080/products" + `?${this.filterArray.join("&")}`,
        null,
        (res) => (this.items.products = res.data)
      );
      console.log(this.items.products);
    },
  },

  mounted() {
    this.getFilterOptions();
  },
};
</script>

<style lang="scss">
@import url("../assets/styles/sass/styles.scss");
</style>
