import Vue from 'vue'
import routes from '../src/routes'
import views from '../src/views'
import '../src/utils/rem'
import '../src/assets/app.scss'

const pathname = window.location.pathname
const Page = `<${routes[pathname].view} />`

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: Page,
    components: views
})
