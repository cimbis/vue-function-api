import format from "string-format-obj";
import { get } from "lodash";
import { msgs } from "../../utils/locale_messages";

let _locale = null;

function initI18n(locale) {
  console.log("setting up i18n...");
  _locale = locale;
}

function useI18n() {
  const msg = (key, obj) => {
    if (!obj) return get(msgs, `${_locale.value}.${key}`);
    else return format(get(msgs, `${_locale.value}.${key}`), obj);
  };

  const getLocalizedFieldNames = formType => get(msgs, `${_locale.value}.fieldNames.${formType.name}`);
  const getLocalizedErrorMsgs = () => get(msgs, `${_locale.value}.errors`);

  return { msg, getLocalizedFieldNames, getLocalizedErrorMsgs };
}

export { initI18n, useI18n };
