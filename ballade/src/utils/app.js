import Settings from '~/settings.json'

const App = {
    GLOBAL: {
        src: Settings.source,
        server: Settings.server,
        winWidth: window.screen.availWidth,
        winHeight: window.screen.availHeight
    },
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
                    ? decodeURIComponent(search.split('uri=')[1]).split('?')[1].split('&')
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
    $gmclient: {
        isClient: () => {
            var ua = window.navigator.userAgent.toLowerCase()
            return ua.indexOf('gengmei') > 0
        },
        version: () => {
            var ua = window.navigator.userAgent.toLowerCase()
            var tmp = ua.split(' ')
            var gmInfo = tmp[tmp.length - 1].split('/')
            var version = (gmInfo.length === 2 && gmInfo[0] === 'gengmei') ? gmInfo[1] : ''
            return version
        },
        diffVersion: (curVersion, baseVersion) => {
            if (!(curVersion && baseVersion)) {
                return false
            }
            var cur = curVersion.split('.')
            var base = baseVersion.split('.')
            if (cur[2] === undefined) {
                cur[2] = '0'
            }
            if (base[2] === undefined) {
                base[2] = '0'
            }
            var result = cur[0] * 10000 + cur[1] * 100 + cur[2] - (base[0] * 10000 + base[1] * 100 + base[2])
            return result
        }
    },
    showToast: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.showToast !== 'undefined')) {
            gmclient.showToast(JSON.stringify(opts))
        }
    }
}
App.install = (Vue, options) => {
    Vue.prototype.GLOBAL = App.GLOBAL
    Vue.prototype.$app = {
        showToast: App.showToast
    }
    Vue.prototype.$gmclient = App.$gmclient
    Vue.prototype.$router = App.$router
}

export default App
