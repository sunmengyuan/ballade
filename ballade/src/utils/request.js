import Axios from 'axios'
import Cookie from 'vue-cookie'
import Qs from 'qs'
import Settings from '~/settings.json'
import App from '@/utils/app'

window.phantomRequestCallbacks = {}
const Server = (process.env.NODE_ENV === 'production') ? Settings.server : ''
const Request = (opts = {}) => {
    var tracks = {
        t: (new Date()).valueOf(),
        version: App.$gmclient.version(),
        hybrid: App.$gmclient.isClient(),
        channel: App.$router.query('channel'),
        current_city_id: App.$router.query('current_city_id'),
        device_id: App.$router.query('device_id'),
        idfa: App.$router.query('idfa'),
        idfv: App.$router.query('idfv'),
        lat: App.$router.query('lat'),
        lng: App.$router.query('lng'),
        platform: App.$router.query('platform'),
        os_version: App.$router.query('os_version'),
        json: ''
    }
    // 请求成功回调
    var successFn = opts.successFn || function () {}
    // 请求失败回调
    var failFn = opts.failFn || function () {}
    // 请求完成回调
    var completeFn = opts.completeFn || function () {}
    // 网络错误回调
    var errorFn = () => {
        if (opts.errorFn) {
            opts.errorFn()
        } else {
            console.log('网络错误')
        }
    }
    if (process.env.NODE_ENV === 'production') {
        window.phantomRequestCallbacks[opts.url] = (res) => {
            if (res.status === 200) {
                (res.data.error === 0) ? successFn(res.data) : failFn(res.data)
                completeFn(res.data)
            } else {
                errorFn()
            }
        }
        let paramsStr = '?'
        let params = { ...opts.params, ...tracks }
        for (let key in params) paramsStr += `&${key}=${params[key]}`
        /* eslint-disable no-undef */
        if ((typeof phantom !== 'undefined') && (typeof phantom.request !== 'undefined')) {
            phantom.request(JSON.stringify({
                url: Server + opts.url + paramsStr,
                method: opts.method || 'GET',
                data: opts.data,
                callback: `window.phantomRequestCallbacks['${opts.url}']`
            }))
        }
    } else {
        Axios({
            url: Server + opts.url,
            method: opts.method || 'GET',
            headers: {
                'Content-type': opts.contentType || 'application/x-www-form-urlencoded',
                'X-CSRFToken': Cookie.get('csrftoken')
            },
            params: {
                ...opts.params,
                ...tracks
            },
            data: Qs.stringify(opts.data || {})
        }).then((res) => {
            if (res.status === 200) {
                (res.data.error === 0) ? successFn(res.data) : failFn(res.data)
                completeFn(res.data)
            } else {
                errorFn()
            }
        }).catch(() => {
            errorFn()
        })
    }
}
Request.install = (Vue, options) => {
    Vue.prototype.$request = Request
}

export default Request
