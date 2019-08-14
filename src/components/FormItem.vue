<template>
  <div class="form-group">
    <label :for="fieldName">{{ label }}</label>
    <input
      :id="fieldName"
      class="form-control"
      :class="{ 'is-invalid': error }"
      type="text"
      v-model="value"
    >
    <span class="invalid-feedback">{{ error }}</span>
  </div>
</template>

<script>
import { useFormFieldManager } from "../composites/form_management";

export default {
  props: { fieldName: String }, // this declaration is optional in Vue 3
  setup({ fieldName }) {
    const { value, label, error } = useFormFieldManager(fieldName);
    return { fieldName, value, label, error };
  },
};
</script>