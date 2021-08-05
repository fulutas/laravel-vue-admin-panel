import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
 
// Axios configurasyon
axios.defaults.baseURL = 'http://localhost:8100/api/';
axios.defaults.withCredentials = true // API tarafından otomatik eklenen JWT cookie eklenmesi için aktif edilir. 

createApp(App).use(store).use(router).mount('#app')
