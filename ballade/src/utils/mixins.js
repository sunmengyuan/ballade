import Request from '@/utils/request'

const CheckLogin = {
    data () {
        return {
            loginUser: {
                id: null,
                portrait: ''
            }
        }
    },

    created () {
        Request({
            url: '/hybrid/get_current_user/',
            method: 'GET',
            successFn: (data) => {
                this.loginUser.id = data.data.current_user
                this.loginUser.portrait = data.data.current_user_portrait
            }
        })
    }
}

export {
    CheckLogin
}
