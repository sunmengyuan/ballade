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
            // 列表数据字段名
            key: opts.key,
            params: opts.params || {},
            // 每一分页数据加载条数
            count: opts.count || 10,
            // 每一分页请求成功回调
            callbackFn: opts.callbackFn || function () {},
            // 所有分页数据加载完毕回调
            completeFn: opts.completeFn || function () {},
            // 无相关数据回调
            nodataFn: opts.nodataFn || function () {},
            // 请求失败回调（error 值非零情况，非真正网络错误）
            failFn: opts.failFn || function () {},
            // 网络错误回调
            errorFn: opts.errorFn || function () {}
        }
        this.loadData()
        /**
         * @type
         *     scroll: 上拉加载更多
         *     click: 点击加载更多
         */
        var type = opts.type || 'scroll'
        if (type === 'scroll') this.listenScroll()
    },
    loadData: function () {
        var view = this.view
        var opts = this.opts
        var status = {
            page: view._Loadmore.page || 1,
            start_num: view._Loadmore.start_num || 0,
            flag: (view._Loadmore.flag !== undefined)
                ? view._Loadmore.flag
                : true
        }
        if (!this.flag) return
        this.flag = false
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
                    this.flag = true
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
                    this.flag = true
                },
                errorFn: () => {
                    opts.errorFn({
                        page: status.page,
                        start_num: status.start_num
                    })
                    this.flag = true
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
