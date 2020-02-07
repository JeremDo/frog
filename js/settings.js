var Settings = {
    clickAction: 'click',
    downAction: 'mousedown',
    upAction: 'mouseup',
    init: function () {
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            Settings.clickAction = 'touchend';
            Settings.downAction = 'touchstart';
            Settings.upAction = 'touchend';
        }
    }
}

Settings.init();