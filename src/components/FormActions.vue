<template>
  <div>
    <button type="button" class="btn btn-primary" :disabled="!valid" @click="save">{{ msg('save') }}</button>
    <span>&nbsp;</span>
    <button type="button" class="btn btn-primary" @click="reset">{{ msg('reset') }}</button>
  </div>
</template>

<script>
import { useI18n } from "../composites/base/i18n";

export default {
  props: ["valid", "save", "reset"],
  setup({ valid, save, reset }) {
    const { msg } = useI18n();
    return { valid, save, reset, msg };
  },
};
</script>