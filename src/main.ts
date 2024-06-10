import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import i18n from './plugins/i18n'
import './assets/scss/main.scss'

import App from './App.vue'

import { Default, Empty } from './layouts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router).use(pinia).use(i18n)
    .component('default', Default)
    .component('empty', Empty)

app.mount('#app')
