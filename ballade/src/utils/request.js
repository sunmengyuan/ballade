import Axios from 'axios'

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
        url: opts.url,
        method: opts.method || 'GET',
        headers: {
            'Content-type': opts.contentType || 'application/json;charset=UTF-8'
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
