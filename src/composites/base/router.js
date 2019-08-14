import { value, onMounted, onUnmounted } from "vue-function-api";
import { find } from "lodash";

let _routes;
let currentRoute;

function findRoute() {
  const path = window.location.hash.slice(1);
  return find(_routes, { path });
}

function updateRoute() {
  console.log("updating current route...");
  currentRoute.value = findRoute();
}

function initRouter(routes) {
  console.log("setting up router...");
  _routes = routes;
  window.location.hash = "#/";
  currentRoute = value(findRoute());

  onMounted(() => window.addEventListener("hashchange", updateRoute));
  onUnmounted(() => window.removeEventListener("hashchange", updateRoute));
}

function useRouter() {
  return {
    currentRoute,
    push({ name }) {
      const route = find(_routes, { name });
      window.location.hash = route.path;
    },
  };
}

export { initRouter, useRouter };
