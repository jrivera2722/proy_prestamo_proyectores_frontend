import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VueSelect from 'vue-select'

import 'vue-select/dist/vue-select.css';

import router from "../src/router/router"
createApp(App).use(router).component("v-select", VueSelect).mount('#app')
