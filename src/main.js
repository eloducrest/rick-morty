import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
// TAILWIND
import "./assets/app.css";
// COMPONENTS
import CardComponent from "./components/CardComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
import PaginationComponent from "./components/PaginationComponent.vue";
const app = createApp(App);

app.use(router)
    .component('CardComponent', CardComponent)
    .component('FooterComponent', FooterComponent)
    .component('ModalComponent', ModalComponent)
    .component('NavbarComponent', NavbarComponent)
    .component('PaginationComponent', PaginationComponent)
    .use(VueAxios, axios);

app.mount("#app");
