import * as VueRouter from "vue-router";
import createDiary from "./pages/createDiary.vue";
import TopPage from "./pages/topPage.vue";
import ShowDiary from "./pages/showDiary.vue";

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/",
    name: "top",
    component: () => TopPage,
  },
  {
    path: "/create",
    name: "create",
    component: () => createDiary,
  },
  {
    path: "/detail",
    name: "detail",
    component: () => ShowDiary,
  },
];

export const createRouter = (type: "memory" | "history") => {
  const history =
    type === "memory"
      ? VueRouter.createMemoryHistory()
      : VueRouter.createWebHistory();
  return VueRouter.createRouter({ history, routes });
};
