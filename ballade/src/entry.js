import Vue from 'vue'
import routes from './routes'

const pathname = window.location.pathname
const Component = routes[pathname].component
new Vue({
    el: '#app',
    template: '<Component />',
    components: {
        Component
    }
})
