import Axios from 'axios'
import Cookie from 'vue-cookie'
import Settings from '~/settings.json'
import App from '@/utils/app'
const Server = (process.env.NODE_ENV === 'production') ? Settings.server : ''

export default (opts = {}) => {
    var tracks = {
        t: (new Date()).valueOf(),
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
