import Axios from 'axios'
import Cookie from 'vue-cookie'
import settings from '../../settings.json'
const Server = (process.env.NODE_ENV === 'production') ? settings.server : ''

export default (opts = {}) => {
    var tracks = {
        t: (new Date()).valueOf()
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
