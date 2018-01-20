import Vue from 'vue'
import Cookie from 'vue-cookie'
import Page from '<%=Page%>'
import App from '@/utils/app'
import Request from '@/utils/request'
import '@/utils/rem'
import '@/assets/app.scss'

Vue.use(Cookie)
Vue.use(App)
Vue.use(Request)
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
