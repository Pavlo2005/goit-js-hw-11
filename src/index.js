import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_sD0BZJV6dCuhWiJggYljYuKDqdstJKqoRhboF4tDcrKwkPUiateuE1o0gLHL6XWl";

const element = {
    form: document.querySelector('.js-form'),
}

element.form.addEventListener('submit', hundlerForm);