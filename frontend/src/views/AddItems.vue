<template>
  <div class="addItems">
    <div class="test"><h1>Add product listing</h1></div>
    <div class="test">
      <form name="createProducts" enctype="multipart/form-data">
        <label for="name"> Name : </label> <br />
        <input type="text" id="name" v-model="newName" required />
        <br />
        <br />

        <label for="brand"> Brand : </label> <br />
        <input type="text" id="brand" v-model="newBrand" required /> <br />
        <br />

        <label for="description"> Description : </label> <br />
        <textarea
          type="text"
          id="description"
          row="40"
          col="30"
          v-model="newDescription"
          required
        >
        </textarea>
        <br />
        <br />

        <label for="category"> Category : </label> <br />
        <select id="category" v-model="newCategory" required>
          <option value="none" selected disabled>Choose category</option>
          <option value="shoes">Shoes</option>
          <option value="sandals">Sandals</option>
          <option value="apparels">Apparels</option>
        </select>
        <br />
        <br />

        <div v-if="newCategory === 'shoes'">
          Shoes Type : <input type="text" v-model="newShoesType" />
          <br />
          <br />
        </div>

        <div v-if="newCategory === 'apparels'">
          Apparel Type : <input type="text" v-model="newApparelType" />
          <br />
          <br />
        </div>

        <!-- IMAGE UPLOAD FORM !!! -->

        <input
          type="file"
          name="image"
          id=""
          @change="onFileSelected"
          multiple
        />
        <br /><br />

        <!-- ADD VARIANT SECTION !!! -->

        <form action="">
          <button @click.prevent="addVariants" v-if="!variantsContainer.length">
            Add Variants
          </button>
          <br />

          <div
            class="variants"
            v-for="(variantDatas, index) in variantsContainer"
            :key="index"
          >
            <label for="user-category"> User-Category : </label> <br />
            <select
              id="user-category"
              v-model="variantDatas.user_category"
              required
            >
              <option value="none" selected disabled>
                Choose user-category
              </option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
            <br />

            <input type="hidden" v-model="variantsContainer[index]" />

            <label for="size">Size: </label> <br />
            <div v-if="newCategory === 'shoes'">
              <input type="number" v-model="variantDatas.variant_size" /> <br />
            </div>
            <div v-if="newCategory === 'apparels'">
              <select
                id="apparel-size"
                v-model="variantDatas.apparel_size"
                required
              >
                <option value="none" selected disabled>Choose sizes</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
            </div>

            <label for="price">Price: </label> <br />
            <input type="number" v-model="variantDatas.variant_price" /> <br />

            <label for="stocks">Stocks: </label> <br />
            <input type="number" v-model="variantDatas.number_of_stocks" />
            <br />
            <br />

            <button @click.prevent="addVariants">+</button> &nbsp;
            <button @click.prevent="delVariants(index)">X</button>
          </div>
        </form>

        <br />

        <button type="submit" @click.prevent="addItems">Submit</button>
      </form>
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
      newName: "",
      newBrand: "",
      newDescription: "",
      newCategory: "",
      newShoesType: null,
      newApparelType: null,
      variantsContainer: [],
      file: [],
    };
  },

  methods: {
    // store the file input in this.file var

    onFileSelected(event) {
      // this.file = event.target.files[0];
      for (let imgs of event.target.files) {
        this.file.push(imgs);
      }
    },

    // add product items on database

    async addItems() {
      const formData = new FormData();

      formData.append("product_name", this.newName);
      formData.append("product_brand", this.newBrand);
      formData.append("product_description", this.newDescription);
      formData.append("product_category", this.newCategory);

      if (this.newShoesType != "null") {
        formData.append("shoes_type", this.newShoesType);
      }

      if (this.newApparelType != "null") {
        formData.append("apparel_type", this.newApparelType);
      }

      for (let resImg of this.file) {
        formData.append("image", resImg);
      }

      // appending array using stringify then parse in the backend

      formData.append("variantData", JSON.stringify(this.variantsContainer));

      await fetchApi(
        "post",
        "http://localhost:8080/products/addProducts",
        formData,
        (res) => (this.items.products = res.data)
      );

      console.log(formData.entries);
      this.$router.push("/products").then(() => this.$router.go());
    },

    addVariants() {
      this.variantsContainer.push({});
    },

    delVariants(index) {
      this.variantsContainer.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.addItems {
  height: auto;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border: 1px solid black;
}
.test {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>