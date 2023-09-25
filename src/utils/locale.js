import {useLocale} from "./index";
import {ref} from "vue";

let _t = null;
let _locale = ref(null);

function t(...args) {
    return _t(...args);
}

const globalUseLocale = (locale) => {
    _locale.value = locale;
    const data = useLocale(_locale);
    _t = data.t;
    return data;
};

globalUseLocale();

export default globalUseLocale;

export {t};
