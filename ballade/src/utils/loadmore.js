import Request from '@/utils/request'

const Loadmore = {
    view: null,
    opts: null,
    do: function (view, opts) {
        this.view = view
        this.opts = {
            url: opts.url,
            count: opts.count || 10,
            params: opts.params || {},
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
        var view = this.view
        var opts = this.opts
        var status = {
            page: (view._Loadmore && view._Loadmore.page) || 1,
            start_num: (view._Loadmore && view._Loadmore.start_num) || 0,
            flag: ((view._Loadmore && view._Loadmore.flag) !== undefined)
                ? view._Loadmore.flag
                : true
        }
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
                    view._Loadmore = {
                        page: status.page + 1,
                        start_num: status.start_num + opts.count
                    }
                    var list = opts.key ? data.data[opts.key] : data.data
                    if (list.length < 10) {
                        if ((status.page === 1) || (status.start_num === 0)) {
                            view._Loadmore.flag = false
                            opts.completeFn()
                        }
                    }
                },
                failFn: (data) => {
                    var list = opts.key ? data.data[opts.key] : data.data
                    var isNull = (data.error === 1) || (list === null) || ((list instanceof Array) && !list.length) || (JSON.stringify(list) === '{}')
                    if (isNull) {
                        view._Loadmore.flag = false
                        if ((status.page === 1) || (status.start_num === 0)) {
                            opts.nodataFn()
                        }
                        opts.completeFn()
                    }
                    opts.failFn()
                },
                errorFn: () => {
                    if ((status.page === 1) || (status.start_num === 0)) {
                        opts.errorFn()
                    }
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
