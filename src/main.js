import Vue from "vue";
import { plugin as functionAPI } from "vue-function-api";
import { initStore } from "./composites/base/store";
import { initTheme } from "./composites/base/theme";
import { initI18n } from "./composites/base/i18n";
import { initRouter } from "./composites/base/router";
import { routes } from "./utils/routes";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(functionAPI);

new Vue({
  setup() {
    const { appLocale, appThemeColor } = initStore();
    initTheme(appThemeColor);
    initI18n(appLocale);
    initRouter(routes);
  },
  render: h => h(App),
}).$mount("#app");
