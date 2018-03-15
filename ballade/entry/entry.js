import Vue from 'vue'
import Cookie from 'vue-cookie'
import FastClick from 'fastclick'
import Page from '<%=Page%>'
import App from '@/utils/app'
import Request from '@/utils/request'
import store from '@/store'
import '@/utils/rem'
import '@/assets/app.scss'

!window.detachFastclick && FastClick.attach(window.document.body)

Vue.use(Cookie)
Vue.use(App)
Vue.use(Request)
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<Page />',
    components: {
        Page
    }
})
