const App = {
    do: function () {
        window.gmJS = {}
    },
    $router: {
        query: (key) => {
            var search = window.location.search
            var value = ''
            var tmp = []
            if (search) {
                tmp = (process.env.NODE_ENV === 'production')
                    ? decodeURI(search.split('uri=')[1]).split('?')[1].split('&')
                    : search.slice(1).split('&')
            }
            for (let i in tmp) {
                if (key === tmp[i].split('=')[0]) {
                    value = tmp[i].split('=')[1]
                    break
                }
            }
            return value
        }
    },
    $gmclient: {}
}
App.install = (Vue, options) => {
    Vue.prototype.$app = {

    }
    Vue.prototype.$gmclient = App.$gmclient
    Vue.prototype.$router = App.$router
}

export default App
