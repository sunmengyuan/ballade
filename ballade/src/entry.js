import Vue from 'vue'
import routes from './routes'
import views from './views'

const pathname = window.location.pathname
const Page = views[routes[pathname].name]

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
