import { watch, value } from "vue-function-api";
import Validator from "validatorjs";

function useValidation(model, rules, localizedFieldNames, localizedErrorMsgs) {
  console.log("setting up validation...");
  const valid = value(true);
  const errors = value({});
  const validateAll = () => {
    const validator = new Validator(model, rules, localizedErrorMsgs);
    validator.setAttributeNames(localizedFieldNames);

    valid.value = validator.passes();
    errors.value = validator.errors;
  };

  for (const prop in rules) {
    watch(() => model[prop], validateAll);
  }

  return { valid, errors };
}

export { useValidation };
