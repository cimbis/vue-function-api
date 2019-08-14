import { provide, inject, computed } from "vue-function-api";

import { getRules } from "../utils/validation_rules";
import { useValidation } from "./base/validation";
import { useStore } from "./base/store";
import { useRouter } from "./base/router";
import { useI18n } from "./base/i18n";

const symbols = {
  formData: Symbol(),
  formLabels: Symbol(),
  formErrors: Symbol(),
};

function useFormManager(formType) {
  const { getFormData, getSaveFunction, reset: resetStore } = useStore();
  const { getLocalizedFieldNames, getLocalizedErrorMsgs } = useI18n();
  const { push } = useRouter();

  const saveFunction = getSaveFunction(formType);

  const formName = formType.name;
  const formData = getFormData(formType);
  const formRules = getRules(formType);
  const formLabels = getLocalizedFieldNames(formType);
  const formErrorMsgs = getLocalizedErrorMsgs();
  const { valid, errors } = useValidation(formData, formRules, formLabels, formErrorMsgs);

  provide({
    [symbols.formData]: formData,
    [symbols.formLabels]: formLabels,
    [symbols.formErrors]: errors,
  });

  return {
    formName,
    valid,
    save() {
      saveFunction();
      push({ name: "profileChooser" });
    },
    reset() {
      resetStore();
      push({ name: "profileChooser" });
    },
  };
}

function useFormFieldManager(fieldName) {
  const formData = inject(symbols.formData);
  const labels = inject(symbols.formLabels);
  const errors = inject(symbols.formErrors);

  const value = computed(
    () => formData[fieldName],
    val => {
      formData[fieldName] = val;
    },
  );
  const label = computed(() => labels[fieldName]);
  const error = computed(() => errors.value.first(fieldName));

  return { value, label, error };
}

export { useFormManager, useFormFieldManager };
