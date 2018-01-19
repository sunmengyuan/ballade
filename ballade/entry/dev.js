import Vue from 'vue'
import Cookie from 'vue-cookie'
import Routes from '@/routes'
import Views from '@/views'
import App from '@/utils/app'
import '@/utils/rem'
import '@/assets/app.scss'

const Pathname = window.location.pathname
const Page = `<${Routes[Pathname].view} />`

Vue.use(Cookie)
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: Page,
    components: Views
})
