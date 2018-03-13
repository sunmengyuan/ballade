import Request from '@/utils/request'
import { SET_ACCOUNT } from '../mutations'

export default {
    state: {
        account: {
            id: null,
            portrait: ''
        }
    },

    getters: {
        account (state) {
            return state.account
        }
    },

    mutations: {
        [SET_ACCOUNT] (state, data) {
            state.account = data
        }
    },

    actions: {
        checkLogin ({ commit }) {
            Request({
                url: '/hybrid/get_current_user/',
                method: 'GET',
                successFn: (data) => {
                    commit(SET_ACCOUNT, {
                        id: data.data.current_user,
                        portrait: data.data.current_user_portrait
                    })
                }
            })
        }
    }
}
