<template>
  <div id="app">
    <Header/>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import RouterView from "./components/RouterView.vue";

export default {
  components: { Header, RouterView },
};
</script>
