<template>
  <component :is="currentRoute.component" />
</template>

<script>
import { useRouter } from "../composites/base/router";

export default {
  setup() {
    const { currentRoute } = useRouter();
    return { currentRoute };
  },
};
</script>
