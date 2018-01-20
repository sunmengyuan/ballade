import Request from '@/utils/request'

const Loadmore = {
    flag: true,
    view: null,
    opts: null,
    do: function (view, opts) {
        this.flag = true
        this.view = view
        this.view._Loadmore = view._Loadmore || {}
        this.opts = {
            url: opts.url,
            key: opts.key,
            params: opts.params || {},
            count: opts.count || 10,
            callbackFn: opts.callbackFn || function () {},
            completeFn: opts.completeFn || function () {},
            nodataFn: opts.nodataFn || function () {},
            failFn: opts.failFn || function () {},
            errorFn: opts.errorFn || function () {}
        }
        this.loadData()
        var type = opts.type || 'scroll'
        if (type === 'scroll') this.listenScroll()
    },
    loadData: function () {
        var _this = this
        var view = this.view
        var opts = this.opts
        var status = {
            page: view._Loadmore.page || 1,
            start_num: view._Loadmore.start_num || 0,
            flag: (view._Loadmore.flag !== undefined)
                ? view._Loadmore.flag
                : true
        }
        if (!_this.flag) return
        _this.flag = false
        if (status.flag) {
            Request({
                url: opts.url,
                params: {
                    ...opts.params,
                    page: status.page,
                    start_num: status.start_num,
                    count: opts.count
                },
                successFn: (data) => {
                    opts.callbackFn(data.data)
                    view._Loadmore.page = status.page + 1
                    view._Loadmore.start_num = status.start_num + opts.count
                    var list = opts.key ? data.data[opts.key] : data.data
                    if ((list instanceof Array) && (list.length < 10)) {
                        if ((status.page === 1) || (status.start_num === 0)) {
                            view._Loadmore.flag = false
                            opts.completeFn(data)
                        }
                    }
                    _this.flag = true
                },
                failFn: (data) => {
                    var list = opts.key ? data.data[opts.key] : data.data
                    var isNull = (data.error === 1) || (list === null) || ((list instanceof Array) && !list.length) || (JSON.stringify(list) === '{}')
                    if (isNull) {
                        view._Loadmore.flag = false
                        if ((status.page === 1) || (status.start_num === 0)) {
                            opts.nodataFn(data)
                        }
                        opts.completeFn(data)
                    }
                    opts.failFn({
                        data: data,
                        page: status.page,
                        start_num: status.start_num
                    })
                    _this.flag = true
                },
                errorFn: () => {
                    opts.errorFn({
                        page: status.page,
                        start_num: status.start_num
                    })
                    _this.flag = true
                }
            })
        }
    },
    clear: function () {
        this.view._Loadmore = {
            flag: true,
            page: 1,
            start_num: 0
        }
    },
    listenScroll: function () {
        var t = null
        var pos = 0
        window.addEventListener('scroll', () => {
            if (t === null) {
                t = setTimeout(() => {
                    var scrollY = window.scrollY
                    var scrollHeight = document.body.scrollHeight
                    var screenHeight = window.screen.availHeight
                    if (scrollY > pos) {
                        if (scrollHeight - scrollY < screenHeight + 20) this.loadData()
                    }
                    pos = scrollY
                    t = null
                }, 16)
            }
        })
    }
}

export default Loadmore
