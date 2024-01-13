import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// // Bootstrap shits
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'

const app = createApp(App)
// Router shits
app.use(router)

// Mounting the app
app.mount('#app')

