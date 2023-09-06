import axios from "axios";

import { addSelect } from "./template/add-select";
import { fetchCatByBreed } from "./template/cat-api";
import { createCat } from "./template/create-cat";
import { catchErr } from "./template/catch-err";

axios.defaults.headers.common["x-api-key"] = "live_sD0BZJV6dCuhWiJggYljYuKDqdstJKqoRhboF4tDcrKwkPUiateuE1o0gLHL6XWl";

const select = document.querySelector('.js-select');

const element = {
    cat: document.querySelector('.js-cat-info'),
    error: document.querySelector('.js-error'),
    loader: document.querySelector('.js-loader')
}

addSelect();

const link = {
    cat1: 'https://api.thecatapi.com/v1/images/search?breed_ids=',
    cat2: 'https://api.thecatapi.com/v1/images/'
}

function handlerSelect() {
    element.cat.innerHTML = "";
    element.loader.classList.replace('loader-hidden', 'loader');
    element.error.classList.replace('error', 'error-hidden');

    fetchCatByBreed(link.cat1, select.value)
        .then(data => {
            fetchCatByBreed(link.cat2, data[0].id)
                .then(data => {
                    element.cat.innerHTML = createCat(data);
                    element.loader.classList.replace('loader', 'loader-hidden');
                })
                .catch(err => {
                    catchErr();
                });
        })
        .catch(err => {
            catchErr();
        });
}

export { handlerSelect, element };




