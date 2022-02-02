import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Detail from "../views/detail.vue";


const routes = [
   { path: "/", component: Home },
   { path: "/detail/:id", component: Detail, params: true },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;