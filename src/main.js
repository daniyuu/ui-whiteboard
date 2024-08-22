import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/minimap/dist/style.css";
import router from "./router";
import 'ant-design-vue/dist/reset.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router)
app.mount("#flow");
