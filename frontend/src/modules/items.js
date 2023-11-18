import { reactive } from "vue";

export const items = reactive({

    items: [],
    products: [],

    mounted() {
        this.getAllProducts();
    },

})