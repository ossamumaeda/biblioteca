import './assets/main.css'
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import { pt } from 'yup-locale-pt';
import { setLocale } from 'yup';
import ToastService from 'primevue/toastservice';
import { libraryStore } from "./store/libraryStore";

setLocale(pt);

window.log = console.log;

const app = createApp(App);

app.provide("libraryStore", libraryStore);

app.use(ToastService);
app.use(PrimeVue, {

    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark'
        }
    }
});
app.use(router);
app.mount('#app');
