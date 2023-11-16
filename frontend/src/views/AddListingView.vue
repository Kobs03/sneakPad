<template>
  <h1>Add product listing</h1>

  <div class="form">
    <label for="itemName">Name : {{ newName }} </label>
    <input type ="text" placeholder="name"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
    />
    <br /><br />

    <!-- <label for="itemBrand">Brand : </label>
    <input type="text" placeholder="brand" /> <br /><br />

    <label for="itemDescription">Description : </label> <br />
    <textarea placeholder="description" row="4" cols="30"></textarea>
    <br /><br />

    <label for="itemCategory">Category : </label>
    <select id="category">
      <option disabled selected>Choose category</option>
      <option value="shoes">shoes</option>
      <option value="sandals">sandals, flip &flops</option>
      <option value="apparel">apparel</option>
    </select>
    <br /><br />

    <label for="itemPrice">Price : </label>
    <input type="number" placeholder="price" /> <br /><br />

    <label for="isAvailable">In Stock : </label>
    <input type="checkbox" placeholder="price" /> <br /><br /> -->
    
    <button @click="addItems">Submit</button>

  </div>
</template>

<script>
export default {

  data(){
    return {
    }
  },

  props: [
    "items",
    "addItems",
    "modelValue",
    "newName",
  ],

  methods: {},
};
</script>