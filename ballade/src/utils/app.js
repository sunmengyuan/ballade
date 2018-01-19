export default {
    do: function () {},
    getUrlQuery: (key) => {
        var search = window.location.search
        var value = ''
        var tmp = []
        if (search) tmp = search.slice(1).split('&')
        for (let i in tmp) {
            if (key === tmp[i].split('=')[0]) {
                value = tmp[i].split('=')[1]
                break
            }
        }
        return value
    }
}
