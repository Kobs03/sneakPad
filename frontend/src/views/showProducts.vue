<template>
  <h1>Products:</h1>

  <h4 v-for="(item, index) in items" :key="index">
    {{ item._id }} <br />
    {{ item.productName }} <br />
    {{ item.productCategory }} <br />
    {{ item.productDescription }} <br />
    {{ item.productPrice }} <br />
    {{ item.productStock }} <br />
  </h4>

</template>

<script>
export default {
  props: [
    "items",
  ],
};
</script>