<template>
  <h1>Welcome to Sneak Pad !!</h1>

  {{ file }}

  <form enctype="multipart/form-data">
    <input
      type="file"
      ref="file"
      name="image"
      @change="onSelectedFile"
      id=""
      multiple
    />
    <br />
    <br />
    <button type="submit" @click.prevent="test">upload!</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: "",
    };
  },

  methods: {
    onSelectedFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    async test() {
      const formData = new FormData();
      formData.append("image", this.file);

      console.log(formData)

      try {
        await axios
          .post("http://localhost:8080/products/test", formData)
          .then((res) => console.log(res));
      } catch (error) {
        console.log(error);
        console.log("Upload image error");
      }
    },
  },
};
</script>
