// ==UserScript==
// @name        Mastodon Tweak
// @namespace   klsulico
// @description Mastodon Tweak
// @include     https://mastodon.social/*
// @include     https://pawoo.net/*
// @include     https://mstdn.jp/*
// @include     https://mstdn.io/*
// @include     https://mstdn.*.org/*
// @version     0.1
// @grant       none
// ==/UserScript==


(function() {
    console.log('mastondon tweak v1');

    var body = document.getElementsByTagName('body')[0];
    var column_width = (body.offsetWidth - 300) / 3;

    // Global style
    var css = '.column { width: ' + column_width + 'px }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

})();
