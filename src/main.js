import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/minimap/dist/style.css";


const app = createApp(App);
app.mount("#flow");
