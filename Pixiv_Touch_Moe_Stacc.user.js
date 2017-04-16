// ==UserScript==
// @name        Pixiv Touch Moe Stacc
// @namespace   noelpinch
// @description For Pixiv mobile
// @include     https://touch.pixiv.net/stacc*
// @version     0.1
// @grant       none
// ==/UserScript==
//

(function() {
    console.log('pixiv touch moe stacc v1');

    // Global style: img.height -> auto!
    var css = '.stacclist li.illust div.imgbox.bookmark img {max-height: unset; max-width: unset;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

    var imglist = document.getElementsByClassName('imgbox bookmark');
    var count = 0;

    var replace_imgs = function() {
        for (; count < imglist.length; count++) {
            var imgs = imglist[count].getElementsByTagName("img");
            if (imgs.length <= 0) continue;
            if (imgs[0].src.indexOf('data:') == 0) {
                break;
            }
            if (imgs[0].src.indexOf('240x480') < 0) {
                continue;
            }
            imgs[0].src = imgs[0].src.replace('240x480', '480x960');
        }
    }
    replace_imgs();

    var observer;
    var articles = document.getElementById('articles');
    if (imglist.length > 0) {
        observer = new MutationObserver(function(mutations) {
            imglist = document.getElementsByClassName('imgbox bookmark');
            replace_imgs();
        });
        observer.observe(articles, { childList: true, subtree: true, attributes: true });
        console.log('Stacc observer created');
    }

})();