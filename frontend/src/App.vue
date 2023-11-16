<template>
  
  <RouterView :items="items"/>
  
</template>

<script>
  export default {
    data(){
      return {
        items:[]
      }
    },
    
    methods:{
      async getAllProducts(){
        await fetch("http://localhost:8080/products")
        .then(res => res.json())
        .then(data => this.items = data)
        console.log(this.items)
      }
    },  

    mounted(){
      this.getAllProducts()
    }
  }
</script>