import { element } from "..";

function catchErr() {
    element.loader.classList.replace('loader', 'loader-hidden');
    element.error.classList.replace('error-hidden', 'error');
}

export { catchErr };