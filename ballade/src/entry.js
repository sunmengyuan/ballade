import Vue from 'vue'
import routes from './routes-comp'

const pathname = window.location.pathname
const Page = routes[pathname].view

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
