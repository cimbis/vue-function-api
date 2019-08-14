<template>
  <div class="app-header">
    <img width="13%" src="../assets/logo.png">
    <h3>
      <code>function-based api</code> demo
    </h3>
    <p v-if="!isLoggedIn">{{ msg('chooseProfile') }}</p>
    <p class="text-primary" v-else>{{ msg('welcome', { nickname: user.nickname }) }}</p>
  </div>
</template>

<script>
import { useI18n } from "../composites/base/i18n";
import { useStore } from "../composites/base/store";

export default {
  setup() {
    const { msg } = useI18n();
    const { isLoggedIn, user } = useStore();

    return { msg, isLoggedIn, user };
  },
};
</script>

<style>
.app-header {
  text-align: center;
}
.app-header p {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>