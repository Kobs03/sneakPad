<template>
  <div class="addItems">
    <div class="test"><h1>Add product listing</h1></div>
    <div class="test">
      <form id="productsForm" enctype="multipart/form-data">
        <!-- NAME INPUT -->

        <p
          style="color: red"
          v-for="(errors, field) in error"
          :key="field"
          class="error-message"
        >
          {{ errors.join(",") }}
        </p>

        <label for="name"> Name : </label> <br />
        <input type="text" id="product_name" v-model="nameInput" required />
        <br />
        <br />

        <!-- BRAND INPUT -->

        <label for="brand"> Brand : </label> <br />
        <input type="text" id="brand" v-model="brandInput" required /> <br />
        <br />

        <!-- DESCRIPTION INPUT -->

        <label for="description"> Description : </label> <br />
        <textarea
          type="text"
          id="description"
          row="40"
          col="30"
          v-model="descriptionInput"
          required
        >
        </textarea>
        <br />
        <br />

        <!-- TYPE INPUT -->

        <label for="type"> Type : </label> <br />
        <select id="type" v-model="typeInput" required>
          <option value="none" selected disabled>Choose sizes</option>
          <option value="Shoes">Shoes</option>
          <option value="Apparel">Apparel</option>
        </select>
        <br />
        <br />

        <!-- CATEGORY INPUT -->

        <label for="category"> Category : </label> <br />
        <input type="text" id="category" v-model="categoryInput" required />
        <br />
        <br />

        <!-- GENDER INPUT -->

        <label for="gender"> Gender : </label> <br />
        <select id="gender" v-model="genderInput" required>
          <option value="none" selected disabled>Choose user-category</option>
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Unisex">Unisex</option>
        </select>
        <br />
        <br />

        <!-- IMAGE UPLOAD FORM !!! -->

        <label for="image"> Upload Image : </label>
        <input
          type="file"
          name="image"
          id="image"
          @change="onFileSelected"
          multiple
        />
        <br /><br />

        <button type="submit" @click.prevent="addItems">Submit</button>
      </form>

      <!-- ADD VARIANT SECTION !!! -->

      <form action="" id="variantsForm">
        <button @click.prevent="addVariants" v-if="!variantsContainer.length">
          Add Variants
        </button>

        <div
          class="variants"
          v-for="(variantDatas, index) in variantsContainer"
          :key="index"
        >
          <input type="hidden" v-model="variantsContainer[index]" />

          <!-- VARIANT SIZE INPUT !!! -->

          <!-- IF SHOES  -->

          <div v-if="typeInput === 'Shoes'">
            <label for="size" v-if="typeInput">Size: </label> <br />
            <input type="number" v-model="variantDatas.shoes_sizes" required />
            <br />
          </div>

          <!-- IF APPARELS -->

          <div v-if="typeInput === 'Apparel'">
            <label for="size" v-if="typeInput">Size: </label> <br />
            <select
              id="apparel-size"
              v-model="variantDatas.apparel_sizes"
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

          <!-- VARIANT PRICE INPUT !!! -->

          <label for="price">Price: </label> <br />
          <input type="number" v-model="variantDatas.variant_price" /> <br />

          <!-- VARIANT STOCKS INPUT !!! -->

          <label for="stocks">Stocks: </label> <br />
          <input type="number" v-model="variantDatas.variant_stocks" />
          <br />
          <br />

          <button @click.prevent="addVariants">+</button> &nbsp;
          <button @click.prevent="delVariants(index)">X</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { items } from "../modules/items";
import { fetchApi } from "../controllers/controller";
import validate from "validate.js";

export default {
  data() {
    return {
      items,
      nameInput: "",
      brandInput: "",
      descriptionInput: "",
      typeInput: "",
      categoryInput: "",
      genderInput: "",
      variantsContainer: [],
      file: [],
      error: "",
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

    async addItems() {
      // constraints declaration for form validations

      const constraints = {
        product_name: {
          presence: { allowEmpty: false, message: "is required" },
        },
        product_brand: {
          presence: { allowEmpty: false, message: "is required" },
        },
        product_category: {
          presence: { allowEmpty: false, message: "is required" },
        },
        product_description: {
          presence: { allowEmpty: false, message: "is required" },
        },
        product_type: {
          presence: { allowEmpty: false, message: "is required" },
        },
        gender: {
          presence: { allowEmpty: false, message: "is required" },
        },
        variantData: {
          presence: {
            allowEmpty: false,
            message: "^Must have atleast one variant",
          },
        },
      };

      // declaring form data and appending values

      const formData = new FormData();

      formData.append("product_name", this.nameInput);
      formData.append("product_brand", this.brandInput);
      formData.append("product_description", this.descriptionInput);
      formData.append("product_type", this.typeInput);
      formData.append("product_category", this.categoryInput);
      formData.append("gender", this.genderInput);

      // appending array using stringify then parse in the backend

      formData.append("variantData", JSON.stringify(this.variantsContainer));

      for (let resImg of this.file) {
        formData.append("image", resImg);
      }

      // iterating formData object to become a single object data and a valid param

      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
        if (key === "variantData") {
          formDataObject[key] = value = this.variantsContainer;
        }
      });

      // Validate the form data

      const validationResult = validate(formDataObject, constraints);

      if (validationResult) {
        // Handle validation errors here
        console.error(validationResult);
        this.error = validationResult;
        return; // Do not proceed with the API call if validation fails
      }

      // add product items on database

      await fetchApi(
        "post",
        "http://localhost:8080/products/addProducts",
        formData,
        (res) => (this.items.products = res.data)
      );

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