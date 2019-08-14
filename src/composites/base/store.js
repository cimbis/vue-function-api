import Vue from "vue";
import { computed } from "vue-function-api";
import { User, NewCustomerForm, NewProductForm } from "../../models";

console.log("setting up a global store...");
const data = Vue.observable({
  user: new User(),
  formData: {
    [NewCustomerForm.name]: new NewCustomerForm(),
    [NewProductForm.name]: new NewProductForm(),
  },
});

function initStore() {
  return useStore();
}

function useStore() {
  const appLocale = computed(() => (data.user.locale ? data.user.locale : "en"));
  const appThemeColor = computed(() => (data.user.color ? data.user.color : "blue"));
  const isLoggedIn = computed(() => data.user.nickname != null);
  const user = computed(() => data.user);

  const login = loginName => {
    if (loginName === "John") {
      data.user = { nickname: "Johnny", locale: "en", color: "blue" };
    } else if (loginName === "จอห์น") {
      data.user = { nickname: "จอห์นนี่", locale: "th", color: "orange" };
    }
  };
  const saveCustomer = () => {
    console.log(`saving a customer:\n${JSON.stringify(data.formData[NewCustomerForm.name])}`);
    // simply reset formData
    reset();
  };
  const saveProduct = () => {
    console.log(`saving a product:\n${JSON.stringify(data.formData[NewProductForm.name])}`);
    // simply reset formData
    reset();
  };

  const getFormData = formType => data.formData[formType.name];
  const getSaveFunction = formType => {
    switch (formType.name) {
      case NewCustomerForm.name:
        return saveCustomer;
      case NewProductForm.name:
        return saveProduct;
      default:
        throw Error(`Unsupported form model: ${formType.name}`);
    }
  };
  const reset = () => {
    data.user = new User();
    data.formData[NewCustomerForm.name] = new NewCustomerForm();
    data.formData[NewProductForm.name] = new NewProductForm();
  };

  return { appLocale, appThemeColor, isLoggedIn, login, user, reset, getFormData, getSaveFunction };
}

export { initStore, useStore };
