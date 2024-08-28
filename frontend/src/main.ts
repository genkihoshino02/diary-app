import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRouter } from "./router";

loadFonts();

createApp(App).use(vuetify).use(createRouter("history")).mount("#app");
