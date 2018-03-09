import Settings from '~/settings.json'
import Request from '@/utils/request'

const App = {
    GLOBAL: {
        // 生产环境服务
        server: Settings.server,
        winWidth: window.screen.availWidth,
        winHeight: window.screen.availHeight,
        curUser: {
            id: null,
            portrait: ''
        }
    },
    do: function () {
        // 供 Native 调用的 Js Function
        window.gmJS = {}
        this.checkLogin()
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
    setPageTitle: (title = '') => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.setPageTitle !== 'undefined')) {
            gmclient.setPageTitle(title)
        }
    },
    setPageData: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.setPageData !== 'undefined')) {
            gmclient.setPageData(JSON.stringify(opts))
        }
    },
    showToast: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.showToast !== 'undefined')) {
            gmclient.showToast(JSON.stringify(opts))
        }
    },
    needLogin: () => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.logout !== 'undefined')) {
            gmclient.logout()
        }
    },
    // 埋点
    trackEvent: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.trackEvent !== 'undefined')) {
            gmclient.trackEvent(JSON.stringify(opts))
        }
    },
    userSkip: (type, id) => {
        switch (type) {
            case 0:
                window.location.href = `gengmei://other_homepage?uid=${id}`
                break
            case 1:
                window.location.href = `gengmei://expert?expert_id=${id}`
                break
            case 2:
                window.location.href = `gengmei://organization_detail?organization_id=${id}`
                break
        }
    },
    checkLogin: function () {
        Request({
            url: '/hybrid/get_current_user/',
            method: 'GET',
            successFn: (data) => {
                this.GLOBAL.curUser.id = data.data.current_user
                this.GLOBAL.curUser.portrait = data.data.current_user_portrait
            }
        })
    }
}
App.install = (Vue, options) => {
    Vue.prototype.GLOBAL = App.GLOBAL
    Vue.prototype.$app = {
        setPageTitle: App.setPageTitle,
        setPageData: App.setPageData,
        showToast: App.showToast,
        needLogin: App.needLogin,
        trackEvent: App.trackEvent,
        userSkip: App.userSkip
    }
    Vue.prototype.$gmclient = App.$gmclient
    Vue.prototype.$router = App.$router
}

export default App
