import Request from '@/utils/request'

const CurUser = {
    data () {
        return {
            GLOBAL: {
                curUser: {
                    id: null,
                    portrait: ''
                }
            }
        }
    },

    created () {
        Request({
            url: '/hybrid/get_current_user/',
            method: 'GET',
            successFn: (data) => {
                this.GLOBAL.curUser.id = data.data.current_user
                this.GLOBAL.curUser.portrait = data.data.current_user_portrait
            }
        })
    }
}

export {
    CurUser
}
