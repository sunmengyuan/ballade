import Vue from 'vue'
import Routes from '../src/routes'
import Views from '../src/views'
import App from '../src/utils/app'
import '../src/utils/rem'
import '../src/assets/app.scss'

const Pathname = window.location.pathname
const Page = `<${Routes[Pathname].view} />`
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: Page,
    components: Views
})
