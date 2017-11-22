import Vue from 'vue'
import routes from './routes-comp'

const pathname = window.location.pathname
const View = routes[pathname].view
new Vue({
    el: '#app',
    template: '<View />',
    components: {
        View
    }
})
