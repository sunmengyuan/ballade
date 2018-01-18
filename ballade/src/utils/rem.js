(function (doc, win) {
    var docEl = doc.documentElement
    var resizeMethod = 'orientationchange' in window ? 'orientationchange' : 'resize'
    function recalculate () {
        var width = docEl.clientWidth
        var rem = width * 100 / 750
        docEl.style.fontSize = Math.min(rem, 50) + 'px'
    }
    recalculate()
    if (!win.addEventListener) return
    win.addEventListener(resizeMethod, recalculate, false)
    doc.addEventListener('DOMContentLoaded', recalculate, false)
})(document, window)
