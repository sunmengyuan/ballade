import App from '@/utils/app'
import Request from '@/utils/request'

export default {
    do: (opts = {}) => {
        var status = opts.status
        switch (status.voted) {
            case true:
                Request({
                    url: opts.cancelUrl,
                    method: 'POST',
                    data: {
                        id: opts.id
                    },
                    successFn: () => {
                        status.voted = false
                        status.count--
                    },
                    failFn: (data) => {
                        App.showToast({
                            text: data.message,
                            duration: 0
                        })
                    }
                })
                break
            case false:
                Request({
                    url: opts.addUrl,
                    method: 'POST',
                    data: {
                        id: opts.id
                    },
                    successFn: () => {
                        status.voted = true
                        status.count++
                    },
                    failFn: (data) => {
                        if (data.error === 1001) {
                            App.needLogin()
                        } else {
                            App.showToast({
                                text: data.message,
                                duration: 0
                            })
                        }
                    }
                })
                break
        }
    }
}
