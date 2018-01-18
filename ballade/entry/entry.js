import Vue from 'vue'
import Page from '<%=Page%>'
import '../src/utils/rem'
import '../../src/assets/app.scss'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Page />',
    components: {
        Page
    }
})
