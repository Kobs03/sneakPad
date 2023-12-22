<template>
  <div class="container_main">
    <div class="filter">
      <div class="filter_options">
        <div class="header">
          <h3>Filters</h3>
        </div>
        <div v-for="(filters, index) of filterArray" :key="index">
          <button @click="removeElem(index), getFilterResponse()">
            {{ filters.split("=")[1].split(" ")[0] }} X
          </button>
        </div>
        <!-------------------PRODUCT TYPE------------------------>
        <div class="collapsible">Type +</div>

        <div
          class="types"
          v-for="(res, index) in filterDatas.types"
          :key="index"
        >
          <input
            type="checkbox"
            id="types"
            :ref="res"
            :value="`product_type=${res}`"
            v-model="filterArray"
            @change="getFilterResponse()"
          />
          {{ res }}
        </div>

        <!---------------------PRODUCT BRAND------------------------->

        <div class="collapsible">Brands +</div>

        <div class="brands" v-for="res of filterDatas.brands" :key="res">
          <input
            type="checkbox"
            id="brands"
            :value="`product_brand=${res}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ res }}
        </div>

        <!-------------------USER GENDER------------------------>

        <div class="collapsible">Gender +</div>

        <div class="selections" v-for="res in filterDatas.gender" :key="res">
          <input
            type="checkbox"
            id="gender"
            :value="`gender=${res}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ res }}
        </div>

        <!-------------------SHOES CATEGORY------------------------>

        <div class="collapsible">Shoes Category +</div>

        <div v-for="res in filterDatas.shoesCat" :key="res">
          <input
            type="checkbox"
            id="category"
            :value="`product_category=${res}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ res }}
        </div>

        <!-------------------SIZES------------------------>

        <div class="collapsible">Shoes Sizes +</div>

        <div
          class="shoes_sizes"
          v-for="sizes in filterDatas.shoesSizes"
          :key="sizes"
        >
          <div class="sizes" v-if="sizes != null">
            <input
              type="checkbox"
              id="sizes"
              :value="`shoes_sizes=${sizes}`"
              v-model="filterArray"
              @change="getFilterResponse"
            />
            US {{ sizes }}
          </div>
        </div>

        <!-------------------APPARELS CATEGORY------------------------>

        <div class="collapsible">Apparels Category +</div>

        <div v-for="res in filterDatas.apparelsCat" :key="res">
          <input
            type="checkbox"
            id="category"
            :value="`product_category=${res}`"
            v-model="filterArray"
            @change="getFilterResponse"
          />
          {{ res }}
        </div>

        <!-------------------APPAREL SIZES------------------------>

        <div class="collapsible">Apparel Sizes +</div>

        <div
          class="apparel_sizes"
          v-for="sizes in filterDatas.apparelSizes"
          :key="sizes"
        >
          <div class="sizes" v-if="sizes != null">
            <input
              type="checkbox"
              id="sizes"
              :value="`apparel_sizes=${sizes}`"
              v-model="filterArray"
              @change="getFilterResponse"
            />
            {{ sizes }}
          </div>
        </div>
        <br />
        <button @click.prevent="getFilterResponse">TEST</button>
      </div>
    </div>

    <!----------------------DISPLAY PRODUCTS AREA------------------------>

    <div class="product_area">
      <div class="header">
        <h1>All Products ({{ items.products.length }} Hanichus)</h1>
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
      filterDisplay: [],
    };
  },

  methods: {
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
    },

    deleteProduct(id) {
      fetchApi(
        "delete",
        `http://localhost:8080/products/delProduct/${id}`,
        null,
        () => location.reload()
      );
    },

    removeElem(i) {
      this.filterArray.splice(i, 1);
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
