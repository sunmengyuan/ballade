import Vue from 'vue'
import Page from '<%=Page%>'
import App from '@/utils/app'
import '@/utils/rem'
import '@/assets/app.scss'

App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
