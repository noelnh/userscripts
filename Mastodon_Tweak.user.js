// ==UserScript==
// @name        Mastodon Tweak
// @namespace   klsulico
// @description Mastodon Tweak
// @include     https://mastodon.social/*
// @include     https://pawoo.net/*
// @include     https://mstdn.jp/*
// @include     https://mstdn.io/*
// @include     https://mstdn.*.org/*
// @version     0.2
// @grant       none
// ==/UserScript==


(function() {
    console.log('mastondon tweak v0.2');

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


    // Swap columns
    var swap_columns = function() {
        var columns_area = document.getElementsByClassName('columns-area');
        var columns = document.getElementsByClassName('column');
        if (columns_area.length > 0 && columns.length > 1) {
            var bells = columns[1].getElementsByClassName('fa-bell');
            if (bells.length > 0) {
                columns_area[0].append(columns[1]);
            }
        }
    }
    var observer = new MutationObserver(function(mutations) {
        swap_columns();
    });

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {

            swap_columns();

            // Create observer
            var columns_area = document.getElementsByClassName('columns-area');
            if (columns_area.length > 0) {
                observer.observe(columns_area[0],
                    { childList: true, subtree: true, attributes: true });
                console.log('Column observer created');
            }
        }
    };

})();
