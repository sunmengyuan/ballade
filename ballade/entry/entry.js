import Vue from 'vue'
import Page from '<%=Page%>'
import App from '../../src/utils/app'
import '../../src/utils/rem'
import '../../src/assets/app.scss'

App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
