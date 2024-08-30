import * as VueRouter from "vue-router";
import LoginForm from "./pages/LoginForm.vue";
import createDiary from "./pages/createDiary.vue";
import TopPage from "./pages/topPage.vue";
import ShowDiary from "./pages/showDiary.vue";
import { getAuthDataFromStorage } from "./utils/auth-data";

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => LoginForm,
  },
  {
    path: "/",
    name: "top",
    component: () => TopPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "create",
    component: () => createDiary,
    meta: { requiresAuth: true },
  },
  {
    path: "/detail",
    name: "detail",
    component: () => ShowDiary,
    meta: { requiresAuth: true },
  },
];

const createRouter = (type: "memory" | "history") => {
  const history =
    type === "memory"
      ? VueRouter.createMemoryHistory()
      : VueRouter.createWebHistory();
  return VueRouter.createRouter({ history, routes });
};

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated =
    getAuthDataFromStorage()["access-token"] !== null ? true : false;
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
