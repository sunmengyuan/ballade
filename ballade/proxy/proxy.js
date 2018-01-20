const APIS = [
    '/hybrid/',
    '/api/'
]

const target = 'https://backend.igengmei.com'
// const target = 'http://backend.test.env'

const onProxyReq = proxyReq => {}
module.exports = APIS.reduce((result, curr) => {
    result[curr] = {
        target,
        onProxyReq,
        changeOrigin: true
    }
    return result
}, {})
