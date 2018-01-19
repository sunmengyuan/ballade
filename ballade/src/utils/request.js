import Axios from 'axios'
import Cookie from 'vue-cookie'
import Settings from '../../settings.json'
import App from '@/utils/app'
const Server = (process.env.NODE_ENV === 'production') ? Settings.server : ''

export default (opts = {}) => {
    var tracks = {
        t: (new Date()).valueOf(),
        channel: App.getUrlQuery('channel'),
        current_city_id: App.getUrlQuery('current_city_id'),
        device_id: App.getUrlQuery('device_id'),
        idfa: App.getUrlQuery('idfa'),
        idfv: App.getUrlQuery('idfv'),
        lat: App.getUrlQuery('lat'),
        lng: App.getUrlQuery('lng'),
        platform: App.getUrlQuery('platform'),
        os_version: App.getUrlQuery('os_version'),
        json: ''
    }
    var successFn = opts.successFn || function () {}
    var failFn = opts.failFn || function () {}
    var completeFn = opts.completeFn || function () {}
    var errorFn = () => {
        if (opts.errorFn) {
            opts.errorFn()
        } else {
            console.log('网络错误')
        }
    }
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
        data: opts.data || {}
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
