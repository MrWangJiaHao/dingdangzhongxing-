(function (doc, win) {
    var resetPage = function () {
        var deviceWidth = doc.documentElement.clientWidth;
        var scale = deviceWidth / 1900;
        if (deviceWidth >= 1900) {
            doc.documentElement.style.fontSize =
                '100px';
        } else {
            doc.documentElement.style.fontSize =
                scale * 100 + 'px';
        }
    }
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', resetPage, false);
    win.addEventListener('resize', resetPage, false);
})(document, window)